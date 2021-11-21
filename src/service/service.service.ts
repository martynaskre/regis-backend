import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessService } from '../business/business.service';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpadateServiceDto } from './dto/update-service.dto';
import { Service } from './service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    private readonly businessService: BusinessService,
  ) {}

  async createService(serviceData: CreateServiceDto) {
    const business = await this.businessService.getBusinessById(
      serviceData.businessId,
    );

    const service = this.serviceRepository.create({
      ...serviceData,
      business,
    });
    await this.serviceRepository.save(service);

    return service;
  }

  async getServices() {
    const services = await this.serviceRepository
      .createQueryBuilder('service')
      .orderBy('service.id')
      .getMany();

    return services;
  }

  async getServicesById(id: number) {
    const service = await this.serviceRepository
      .createQueryBuilder('service')
      .where({ id: id })
      .getOne();

    return service;
  }

  async deleteServiceById(id: number) {
    await this.serviceRepository
      .createQueryBuilder('service')
      .delete()
      .where({ id: id })
      .execute();

    return 'service deleted';
  }

  async updateService(id: number, UpdateServiceBody: UpadateServiceDto) {
    await this.serviceRepository.update(id, UpdateServiceBody);

    return await this.serviceRepository.findOne(id);
  }
}