import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderEntity } from '../provider/provider.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Business } from './business.entity';
import { CreateBussinesDto } from './dto/create-business.dto';
import { UpadateBussinesDto } from './dto/update-business.dto';
import {
  PaginatedBusinessesResultDto,
  PaginationDto,
} from 'src/utils/dto/pagination.dto';
import { GetBusinessDto } from './dto/get-business.dto';
import { Service } from '../service/service.entity';
import '../utils/typeormExtras';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
  ) {}

  async createBusiness(
    businessData: CreateBussinesDto,
    provider: ProviderEntity,
  ) {
    const business = this.businessRepository.create({
      ...businessData,
      provider: provider,
      category: {
        id: businessData.categoryId,
      },
    });
    await this.businessRepository.save(business);

    return business;
  }

  async getBusinesses(
    getBusinessDto: GetBusinessDto,
  ): Promise<PaginatedBusinessesResultDto> {
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

  async getBusinessById(id: number) {
    const business = await this.businessRepository
      .createQueryBuilder('business')
      .where({ id: id })
      .leftJoinAndSelect('business.provider', 'provider')
      .getOne();
    return business;
  }

  async deleteBusinessById(id: number, provider: ProviderEntity) {
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

    return 'business deleted';
  }

  async updateBusiness(
    id: number,
    UpdateBusinessBody: UpadateBussinesDto,
    provider: ProviderEntity,
  ) {
    const business = await this.getBusinessById(id);

    if (business.provider.id !== provider.id) {
      throw new HttpException(
        {
          message: "The id's dont match.",
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.businessRepository.update(id, UpdateBusinessBody);

    return await this.businessRepository.findOne(id);
  }

  async searchBusinesses(
    paginationDto: PaginationDto,
  ): Promise<PaginatedBusinessesResultDto> {
    const totalCount = await this.businessRepository.count();

    const businesses = await this.businessRepository
      .createQueryBuilder('business')
      .orderBy('business.id')
      .getMany();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: businesses,
    };
  }
}
