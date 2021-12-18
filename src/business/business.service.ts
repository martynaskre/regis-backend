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
import { Schedule } from '../schedule/schedule.entity';
import { GetBookingsDto } from './dto/get-bookings.dto';
import * as dayjs from 'dayjs';
import { ProviderBooking } from '../booking/providerBooking.entity';

@Injectable()
export class BusinessService {
  private readonly logger = new Logger(BusinessService.name);

  update(businessId: any, arg1: { rating: number }) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    private readonly storageService: StorageService,
    @InjectRepository(ClientBooking)
    private readonly clientBookingRepository: Repository<ClientBooking>,
  ) {}

  async newGetBookings(
    businessId: number,
    bookingsData: GetBookingsDto,
    clientId?: number,
  ) {
    const startDate = dayjs(bookingsData.startDate); // will always be monday

    const selectedClientBookings = !clientId
      ? []
      : await this.clientBookingRepository
          .createQueryBuilder('clientBooking')
          .where('clientBooking.client = :id', { id: clientId })
          .leftJoinAndSelect('clientBooking.client', 'client')
          .leftJoinAndSelect('clientBooking.service', 'service')
          .getMany();

    const business = await this.businessRepository
      .createQueryBuilder('business')
      .where({ id: businessId })
      .leftJoinAndSelect(
        'business.providerBookings',
        'providerBookings',
        'providerBookings.reservedTime BETWEEN :startDate AND :finishDate',
        {
          startDate: startDate.hour(0).toDate(),
          finishDate: startDate.isoWeekday(Days.SUNDAY).hour(24).toDate(),
        },
      )
      .leftJoinAndSelect('business.services', 'services')
      .leftJoinAndSelect(
        'services.clientBookings',
        'clientBookings',
        `${
          selectedClientBookings.length > 0
            ? 'clientBookings.id NOT IN (:selectedClientBookingsIds) AND '
            : ''
        } clientBookings.reservedTime BETWEEN :startDate AND :finishDate`,
        {
          startDate: startDate.hour(0).toDate(),
          finishDate: startDate.isoWeekday(Days.SUNDAY).hour(24).toDate(),
          selectedClientBookingsIds: selectedClientBookings.map(
            (selectedClientBooking) => selectedClientBooking.id,
          ),
        },
      )
      .leftJoinAndSelect('business.schedules', 'schedule')
      .getOne();

    const providerBookings = business.providerBookings;
    const clientBookings = [];

    for (let x = 0; x < business.services.length; x++) {
      for (let y = 0; y < business.services[x].clientBookings.length; y++) {
        clientBookings.push(business.services[x].clientBookings[y]);
      }
    }

    const realBookings = {};

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

      console.log(isRealClientBooking, realBooking);

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

    console.log(realBookings);

    const bookingEntries: BookingEntry[] = [];
    
    for (let day = Days.MONDAY; day <= Days.SUNDAY; day++) {
      const schedule = business.schedules.find(
        (schedule) => schedule.weekDay === day,
      );

      const workingHours = schedule
        ? Array.from(Array(schedule.finishHours).keys()).slice(
            schedule.startHours,
          )
        : [];

      for (let hour = 0; hour <= 23; hour++) {
        const date = startDate.isoWeekday(day).hour(hour);

        if (workingHours.includes(hour)) {
          const booking = realBookings[day][hour];

          if (booking) {
            bookingEntries.push(realBookings[day][hour]);
          }
        } else {
          bookingEntries.push({
            type: 'taken-provider',
            reservedTime: date.toDate(),
            duration: 1,
          });
        }
      }
    }

    console.log(bookingEntries.length);

    return bookingEntries;
  }

  async getBookings(
    businesId: number,
    cliendId?: number,
  ): Promise<BookingEntry[]> {
    this.logger.log('Getting all business bookings');

    const business = await this.businessRepository
      .createQueryBuilder('business')
      .where({ id: businesId })
      .leftJoinAndSelect('business.providerBookings', 'providerBookings')
      .leftJoinAndSelect('business.services', 'services')
      .leftJoinAndSelect('services.clientBookings', 'clientBookings')
      .leftJoinAndSelect('clientBookings.service', 'service')
      .leftJoinAndSelect('business.schedules', 'schedule')
      .getOne();

    const scheduleEntries = business.schedules.map((schedule: Schedule) => {
      const entries = [];

      return entries;
    });

    console.log(scheduleEntries);

    const providerBookings = business.providerBookings;
    const clientBookings = [];

    const id = [];
    let existingClientBookings = [];

    for (let x = 0; x < business.services.length; x++) {
      if (business.services[x].clientBookings.length !== 0)
        for (let y = 0; y < business.services[x].clientBookings.length; y++) {
          clientBookings.push(business.services[x].clientBookings[y]);
          id.push(business.services[x].clientBookings[y].id);
        }
    }

    if (cliendId) {
      existingClientBookings = await this.clientBookingRepository
        .createQueryBuilder('clientBooking')
        .where('clientBooking.client = :id', { id: cliendId })
        .andWhere('clientBooking.id NOT IN (:bookings)', { bookings: id })
        .orderBy('clientBooking.id')
        .getMany();
    }

    const bookings = [
      ...providerBookings,
      ...clientBookings,
      ...existingClientBookings,
    ].map((entry) => {
      return {
        type: 'default',
        reservedTime: entry.reservedTime,
        duration: entry.duration,
        title: entry instanceof ClientBooking ? entry.service.title : null,
        description:
          entry instanceof ClientBooking ? entry.service.description : null,
      };
    });

    bookings.sort((a, b) => b.reservedTime - a.reservedTime);

    return [];
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
    let businesses = await query.orderBy('business.id').getMany();

    businesses = businesses.map((business) => {
      return {
        ...business,
        logo: this.storageService
          .disk('public')
          .url(`${Business.STORAGE_PATH}/${business.logo}`),
        cover: this.storageService
          .disk('public')
          .url(`${Business.STORAGE_PATH}/${business.cover}`),
      };
    });

    return {
      totalCount,
      page: getBusinessDto.page,
      limit: getBusinessDto.limit,
      data: businesses,
    };
  }

  async getBusinessById(id: number) {
    this.logger.log('Getting business by its id');

    return await this.businessRepository
      .createQueryBuilder('business')
      .where({ id: id })
      .leftJoinAndSelect('business.provider', 'provider')
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
    });
  }
}
