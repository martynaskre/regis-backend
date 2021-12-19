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
  Query,
} from '@nestjs/common';
import { ProviderGuard } from '../auth/guards/provider.guard';
import {
  PaginatedServicesResultDto,
  PaginationDto,
} from '../utils/dto/pagination.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpadateServiceDto } from './dto/update-service.dto';
import { ServiceService } from './service.service';
import { formatResponse } from '../utils';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(ProviderGuard)
  @Post()
  async createService(@Body() service: CreateServiceDto, @Request() request) {
    return this.serviceService.createService(service, request.user);
  }

  @Get()
  async getServices(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedServicesResultDto> {
    const { data, ...additionalProperties } =
      await this.serviceService.getServices({
        ...paginationDto,
        limit: paginationDto.limit > 10 ? 10 : paginationDto.limit,
      });

    return formatResponse('Services', data, additionalProperties);
  }

  @UseGuards(ProviderGuard)
  @Get(':id')
  async getServicesById(@Param('id') id: string) {
    const service = await this.serviceService.getServicesById(Number(id));

    return formatResponse('Service data.', service);
  }

  @UseGuards(ProviderGuard)
  @Delete(':id')
  async deleteServiceById(@Param('id') id: string, @Request() request) {
    return this.serviceService.deleteServiceById(Number(id), request.user);
  }

  @UseGuards(ProviderGuard)
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
