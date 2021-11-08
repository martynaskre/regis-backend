import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessService } from 'src/business/business.service';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
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
        serviceData.businessId
      );
    
    const service = this.serviceRepository.create({
      ...serviceData,
      business
    });
    await this.serviceRepository.save(service);

    return service;
  }
}
