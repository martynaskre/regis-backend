import { Body, Controller, Post } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async createService(@Body() service: CreateServiceDto) {
    return this.serviceService.createService(service);
  }
}
