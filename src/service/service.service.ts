import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessService } from '../business/business.service';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpadateServiceDto } from './dto/update-service.dto';
import { Service } from './service.entity';
import { ProviderEntity } from '../provider/provider.entity';
import {
  PaginatedServicesResultDto,
  PaginationDto,
} from '../utils/dto/pagination.dto';

@Injectable()
export class ServiceService {
  private readonly logger = new Logger(ServiceService.name);

  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    private readonly businessService: BusinessService,
  ) {}

  async createService(serviceData: CreateServiceDto, provider: ProviderEntity) {
    this.logger.log('Creating new service');

    const business = await this.businessService.getBusinessById(
      serviceData.businessId,
    );

    if (!business || business.provider.id !== provider.id) {
      throw new HttpException(
        {
          message: "The id's dont match.",
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const service = this.serviceRepository.create({
      ...serviceData,
      business,
    });
    await this.serviceRepository.save(service);

    return service;
  }

  async getServices(
    paginationDto: PaginationDto,
  ): Promise<PaginatedServicesResultDto> {
    this.logger.log('Getting all service');

    const totalCount = await this.serviceRepository.count();

    console.log(paginationDto);

    const services = await this.serviceRepository
      .createQueryBuilder('service')
      .orderBy('service.id')
      .getMany();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: services,
    };
  }

  async getServicesById(id: number) {
    this.logger.log('Getting service by its id');

    const service = await this.serviceRepository
      .createQueryBuilder('service')
      .where({ id: id })
      .leftJoinAndSelect('service.business', 'business')
      .leftJoinAndSelect('business.provider', 'provider')
      .getOne();

    // ar reikia grazinti business ir provider

    return service;
  }

  async deleteServiceById(id: number, provider: ProviderEntity) {
    this.logger.log('Deleting service by its id');

    const service = await this.getServicesById(id);

    if (service.business.provider.id !== provider.id && !service) {
      throw new HttpException(
        {
          message: "The id's dont match.",
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.serviceRepository
      .createQueryBuilder('service')
      .delete()
      .where({ id: id })
      .execute();

    return 'service deleted';
  }

  async updateService(
    id: number,
    UpdateServiceBody: UpadateServiceDto,
    provider: ProviderEntity,
  ) {
    this.logger.log('Updating service by its id');

    const service = await this.getServicesById(id);

    if (service.business.provider.id !== provider.id && !service) {
      throw new HttpException(
        {
          message: "The id's dont match.",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.serviceRepository.update(id, UpdateServiceBody);

    return await this.serviceRepository.findOne(id);
  }
}
