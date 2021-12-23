import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderEntity } from '../provider/provider.entity';
import { Repository } from 'typeorm';
import { Business } from './business.entity';
import { CreateBussinesDto } from './dto/create-business.dto';
import { UpadateBussinesDto } from './dto/update-business.dto';
import { PaginatedBusinessesResultDto } from 'src/utils/dto/pagination.dto';
import { GetBusinessDto } from './dto/get-business.dto';
import { Service } from '../service/service.entity';
import '../utils/typeormExtras';
import { StorageService } from '../storage/storage.service';
import { generateFilename, throwMoreThanOneBusiness } from '../utils';
import { ClientBooking } from '../booking/clientBooking.entity';
import { BookingEntry, Days } from 'src/types';
import * as dayjs from 'dayjs';
import { ProviderBooking } from '../booking/providerBooking.entity';
import { BookingsDto } from '../utils/dto/bookings.dto';

@Injectable()
export class BusinessService {
  private readonly logger = new Logger(BusinessService.name);

  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    private readonly storageService: StorageService,
    @InjectRepository(ClientBooking)
    private readonly clientBookingRepository: Repository<ClientBooking>,
  ) {}

  /*
   * bookingsData.startDate must be start of the week
   * */
  async getBookings(
    businessIdOrSlug: number | string,
    clientId?: number,
    bookingsData: BookingsDto = new BookingsDto(),
  ): Promise<BookingEntry[]> {
    const startDate = dayjs(bookingsData.startDate); // will always be monday

    const sqlDateComparison = {
      startDate: startDate.format('YYYY-MM-DD'),
      finishDate: startDate.isoWeekday(Days.SUNDAY).format('YYYY-MM-DD'),
    };

    const selectedClientBookings = !clientId
      ? []
      : await this.clientBookingRepository
          .createQueryBuilder('clientBooking')
          .where('clientBooking.client = :id', { id: clientId })
          .andWhere(
            'DATE(clientBooking.reservedTime) BETWEEN :startDate AND :finishDate',
            sqlDateComparison,
          )
          .leftJoinAndSelect('clientBooking.client', 'client')
          .leftJoinAndSelect('clientBooking.service', 'service')
          .getMany();

    let businessQuery = this.businessRepository
      .createQueryBuilder('business')
      .leftJoinAndSelect(
        'business.providerBookings',
        'providerBookings',
        'DATE(providerBookings.reservedTime) BETWEEN :startDate AND :finishDate',
        sqlDateComparison,
      )
      .leftJoinAndSelect('business.services', 'services')
      .leftJoinAndSelect(
        'services.clientBookings',
        'clientBookings',
        `${
          selectedClientBookings.length > 0
            ? 'clientBookings.id NOT IN (:selectedClientBookingsIds) AND '
            : ''
        } DATE(clientBookings.reservedTime) BETWEEN :startDate AND :finishDate`,
        {
          ...sqlDateComparison,
          selectedClientBookingsIds: selectedClientBookings.map(
            (selectedClientBooking) => selectedClientBooking.id,
          ),
        },
      )
      .leftJoinAndSelect('business.schedules', 'schedule');

    if (isNaN(<number>businessIdOrSlug)) {
      businessQuery = businessQuery.where({ slug: businessIdOrSlug });
    } else {
      businessQuery = businessQuery.where({ id: Number(businessIdOrSlug) });
    }

    const business = await businessQuery.getOne();

    const providerBookings = business.providerBookings;
    const clientBookings = [];

    // gathering client bookings of all business services
    for (let x = 0; x < business.services.length; x++) {
      for (let y = 0; y < business.services[x].clientBookings.length; y++) {
        clientBookings.push(business.services[x].clientBookings[y]);
      }
    }

    const realBookings = {};

    // mapping all bookings into an object
    for (const realBooking of [
      ...providerBookings,
      ...clientBookings,
      ...selectedClientBookings,
    ]) {
      const date = dayjs(realBooking.reservedTime);

      if (!realBookings.hasOwnProperty(date.isoWeekday())) {
        realBookings[date.isoWeekday()] = {};
      }

      const isRealClientBooking =
        clientId && realBooking?.client?.id === clientId;

      realBookings[date.isoWeekday()][date.hour()] = {
        type:
          realBooking instanceof ProviderBooking
            ? 'taken-provider'
            : isRealClientBooking
            ? 'default'
            : 'taken-client',
        reservedTime: realBooking.reservedTime,
        duration: realBooking.duration,
        ...(isRealClientBooking && {
          title: realBooking.service.title,
          description: realBooking.service.description,
        }),
      };
    }

    const bookingEntries: BookingEntry[] = [];

    // constructing booking entries array
    for (let day = Days.MONDAY; day <= Days.SUNDAY; day++) {
      const schedule = business.schedules.find(
        (schedule) => schedule.weekDay === day,
      );

      const workingHours = schedule
        ? Array.from(Array(schedule.finishHours).keys()).slice(
            schedule.startHours,
          )
        : [];

      for (let hour = 0; hour < 24; hour++) {
        if (workingHours.includes(hour)) {
          const booking = realBookings?.[day]?.[hour];

          if (booking) {
            bookingEntries.push(booking);
          }
        } else {
          bookingEntries.push({
            type: 'taken-provider',
            reservedTime: startDate
              .isoWeekday(day)
              .hour(hour)
              .minute(0)
              .second(0)
              .millisecond(0)
              .toDate(),
            duration: 1,
          });
        }
      }
    }

    return bookingEntries;
  }

  async getCalendarBookings(
    businessId: number,
    bookingsData: BookingsDto = new BookingsDto(),
  ): Promise<BookingEntry[]> {
    const startDate = dayjs(bookingsData.startDate); // will always be monday

    const business = await this.businessRepository
      .createQueryBuilder('business')
      .where({ id: businessId })
      .leftJoinAndSelect(
        'business.providerBookings',
        'providerBookings',
        'DATE(providerBookings.reservedTime) BETWEEN :startDate AND :finishDate',
        {
          startDate: startDate.format('YYYY-MM-DD'),
          finishDate: startDate.isoWeekday(Days.SUNDAY).format('YYYY-MM-DD'),
        },
      )
      .leftJoinAndSelect('business.services', 'services')
      .leftJoinAndSelect(
        'services.clientBookings',
        'clientBookings',
        'DATE(clientBookings.reservedTime) BETWEEN :startDate AND :finishDate',
        {
          startDate: startDate.format('YYYY-MM-DD'),
          finishDate: startDate.isoWeekday(Days.SUNDAY).format('YYYY-MM-DD'),
        },
      )
      .leftJoinAndSelect('clientBookings.client', 'client')
      .getOne();

    const providerBookings = business.providerBookings;
    const clientBookings = [];

    for (let x = 0; x < business.services.length; x++) {
      for (let y = 0; y < business.services[x].clientBookings.length; y++) {
        clientBookings.push(business.services[x].clientBookings[y]);
      }
    }

    return [...providerBookings, ...clientBookings].map((bookingEntry) => {
      return {
        type: 'default',
        reservedTime: bookingEntry.reservedTime,
        duration: bookingEntry.duration,
        title:
          bookingEntry instanceof ClientBooking
            ? `${bookingEntry.client.firstName} ${bookingEntry.client.lastName} apsilankymas`
            : 'Užimtas laikas',
        id: bookingEntry instanceof ClientBooking ? bookingEntry.id : null,
      };
    });
  }

  async createBusiness(
    businessData: CreateBussinesDto,
    provider: ProviderEntity,
  ) {
    this.logger.log('Creating new business');

    const {
      logo: logoFileData,
      cover: coverFileData,
      ...dataToStore
    } = businessData;

    const coverFile = generateFilename(coverFileData);

    await this.storageService
      .disk('public')
      .put(`${Business.STORAGE_PATH}/${coverFile}`, coverFileData.buffer);

    const logoFile = generateFilename(coverFileData);

    await this.storageService
      .disk('public')
      .put(`${Business.STORAGE_PATH}/${logoFile}`, logoFileData.buffer);

    const business = this.businessRepository.create({
      ...dataToStore,
      logo: logoFile,
      cover: coverFile,
      provider: provider,
      category: {
        id: businessData.categoryId,
      },
      rating: 0,
    });

    try {
      await this.businessRepository.save(business);
    } catch {
      throwMoreThanOneBusiness({
        businessId: 'Provider can only have 1 business',
      });
    }
  }

  async getBusinesses(
    getBusinessDto: GetBusinessDto,
  ): Promise<PaginatedBusinessesResultDto> {
    this.logger.log('Getting all businesses');

    let query = this.businessRepository.createQueryBuilder('business');

    if (getBusinessDto.category) {
      query = query.where('business.categoryId = :categoryId', {
        categoryId: getBusinessDto.category,
      });
    }

    if (getBusinessDto.query) {
      query = query
        .andWhereExists(
          this.servicesRepository
            .createQueryBuilder('service')
            .select('*')
            .where('business.id = service.businessId')
            .andWhere('service.title LIKE :title', {
              title: `%${getBusinessDto.query}%`,
            }),
        )
        .orWhere('business.title LIKE :title', {
          title: `%${getBusinessDto.query}%`,
        });
    }

    const totalCount = await query.getCount();
    const businesses = await query.orderBy('business.id').getMany();

    return {
      totalCount,
      page: getBusinessDto.page,
      limit: getBusinessDto.limit,
      data: businesses,
    };
  }

  async getBusinessById(idOrSlug: number | string) {
    this.logger.log('Getting business by its id');

    let query = this.businessRepository.createQueryBuilder('business');

    if (isNaN(<number>idOrSlug)) {
      query = query.where({ slug: idOrSlug });
    } else {
      query = query.where({ id: Number(idOrSlug) });
    }

    return await query
      .leftJoinAndSelect('business.provider', 'provider')
      .leftJoinAndSelect('business.category', 'category')
      .getOne();
  }

  async deleteBusinessById(id: number, provider: ProviderEntity) {
    this.logger.log('Deleting business by id');

    const business = await this.getBusinessById(id);

    if (business.provider.id !== provider.id) {
      throw new HttpException(
        {
          message: "The id's dont match.",
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.businessRepository
      .createQueryBuilder('business')
      .delete()
      .where({ id: id })
      .execute();

    // ar reikia grazinti visus servisus ir provider

    return 'business deleted';
  }

  async updateBusiness(
    id: number,
    updateBusinessDto: UpadateBussinesDto,
    provider: ProviderEntity,
  ) {
    this.logger.log('Updating business by id');

    const business = await this.getBusinessById(id);

    if (!business || business.provider.id !== provider.id) {
      throw new HttpException(
        {
          message: "The id's dont match.",
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const {
      logo: logoFileData,
      cover: coverFileData,
      categoryId,
      ...dataToUpdate
    } = updateBusinessDto;

    let logoFile = undefined;
    let coverFile = undefined;

    if (logoFileData) {
      await this.storageService
        .disk('public')
        .delete(`${Business.STORAGE_PATH}/${business.logo}`);

      logoFile = generateFilename(logoFileData);

      await this.storageService
        .disk('public')
        .put(`${Business.STORAGE_PATH}/${logoFile}`, logoFileData.buffer);
    }

    if (coverFileData) {
      await this.storageService
        .disk('public')
        .delete(`${Business.STORAGE_PATH}/${business.cover}`);

      coverFile = generateFilename(coverFileData);

      await this.storageService
        .disk('public')
        .put(`${Business.STORAGE_PATH}/${coverFile}`, coverFileData.buffer);
    }

    await this.businessRepository.update(id, {
      ...(logoFileData && { logo: logoFile }),
      ...(coverFileData && { cover: coverFile }),
      ...dataToUpdate,
      category: {
        id: categoryId,
      },
    });
  }

  async getServices(idOrSlug: number | string) {
    let query = this.servicesRepository.createQueryBuilder('service');

    if (isNaN(<number>idOrSlug)) {
      query = query.whereExists(
        this.businessRepository
          .createQueryBuilder('business')
          .where({ slug: idOrSlug })
          .andWhere('service.business = business.id'),
      );
    } else {
      query = query.where('service.business = :businessId', {
        businessId: Number(idOrSlug),
      });
    }

    return await query.getMany();
  }
}
