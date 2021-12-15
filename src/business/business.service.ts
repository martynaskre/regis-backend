import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderEntity } from '../provider/provider.entity';
import { Entity, Repository } from 'typeorm';
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
import { BookingEntry } from 'src/types';

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
  ) {}

  async getBookings(businesId: number): Promise<BookingEntry[]> {
    this.logger.log('Getting all business bookings');

    const business = await this.businessRepository
      .createQueryBuilder('business')
      .where({ id: businesId })
      .leftJoinAndSelect('business.providerBookings', 'providerBookings')
      .leftJoinAndSelect('business.services', 'services')
      .leftJoinAndSelect('services.clientBookings', 'clientBookings')
      .leftJoinAndSelect('clientBookings.service', 'service')
      .getOne();



    const providerBookings = business.providerBookings;
    const clientBookings = [];


    for (let x = 0; x < business.services.length; x++) {
      if (business.services[x].clientBookings.length !== 0)
        for (let y = 0; y < business.services[x].clientBookings.length; y++) {
          clientBookings.push(business.services[x].clientBookings[y]);
        }
    }

    const bookings = [...providerBookings, ...clientBookings].map((entry) => {
      return {
          reservedTime: entry.reservedTime,
          duration: entry.duration,
          title: (entry instanceof ClientBooking) ? entry.service.title : null,
          description: (entry instanceof ClientBooking) ? entry.service.description : null,
      };
  });

    return bookings;
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

    return business;
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

    const business = await this.businessRepository
      .createQueryBuilder('business')
      .where({ id: id })
      .leftJoinAndSelect('business.provider', 'provider')
      .getOne();

    return business;
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
    UpdateBusinessBody: UpadateBussinesDto,
    provider: ProviderEntity,
  ) {
    this.logger.log('Updating business by id');

    const business = await this.getBusinessById(id);

    if (business.provider.id !== provider.id) {
      throw new HttpException(
        {
          message: "The id's dont match.",
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // TODO: sutvarkyti update
    //await this.businessRepository.update(id, UpdateBusinessBody);

    return await this.businessRepository.findOne(id);
  }
}
