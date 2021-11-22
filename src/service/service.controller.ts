import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProviderGuard } from 'src/auth/guards/provider.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpadateServiceDto } from './dto/update-service.dto';
import { ServiceService } from './service.service';

@UseGuards(ProviderGuard)
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async createService(@Body() service: CreateServiceDto, @Request() request) {
    return this.serviceService.createService(service, request.user);
  }

  @Get()
  async getServices() {
    return this.serviceService.getServices();
  }

  @Get(':id')
  async getServicesById(@Param('id') id: string) {
    return this.serviceService.getServicesById(Number(id));
  }

  //@Get(business:id)

  @Delete(':id')
  async deleteServiceById(@Param('id') id: string, @Request() request) {
    return this.serviceService.deleteServiceById(Number(id), request.user);
  }

  @Put(':id')
  async updateService(
    @Param('id') id: string,
    @Body() UpdateServiceBody: UpadateServiceDto,
    @Request() request,
  ) {
    return this.serviceService.updateService(
      Number(id),
      UpdateServiceBody,
      request.user,
    );
  }
}
