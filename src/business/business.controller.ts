import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PaginatedBusinessesResultDto } from '../utils/dto/pagination.dto';
import { ProviderGuard } from '../auth/guards/provider.guard';
import { BusinessService } from './business.service';
import { CreateBussinesDto } from './dto/create-business.dto';
import { UpadateBussinesDto } from './dto/update-business.dto';
import { GetBusinessDto } from './dto/get-business.dto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('business')
export class BusinessController {
  constructor(private readonly bussinesService: BusinessService) {}

  @UseGuards(ProviderGuard)
  @FormDataRequest()
  @Post()
  async createBusiness(
    @Body() business: CreateBussinesDto,
    @Request() request,
  ) {
    return this.bussinesService.createBusiness(business, request.user);
  }

  @UseGuards(ProviderGuard)
  @FormDataRequest()
  @Put(':id')
  async updateBusiness(
    @Param('id') id: string,
    @Body() UpdateBusinessBody: UpadateBussinesDto,
    @Request() request,
  ) {
    return this.bussinesService.updateBusiness(
      Number(id),
      UpdateBusinessBody,
      request.user,
    );
  }

  @Get()
  async getBusinesses(
    @Query() getBusinessDto: GetBusinessDto,
  ): Promise<PaginatedBusinessesResultDto> {
    return this.bussinesService.getBusinesses({
      ...getBusinessDto,
      limit: getBusinessDto.limit > 10 ? 10 : getBusinessDto.limit,
    });
  }

  @UseGuards(ProviderGuard)
  @Get(':id')
  async getBusinessById(@Param('id') id: string) {
    return this.bussinesService.getBusinessById(Number(id));
  }

  @Get(':id/bookings')
  async getBookings(@Param('id') id: string, cliendId?: number) {
    return this.bussinesService.getBookings(Number(id), cliendId);
  }

  @UseGuards(ProviderGuard)
  @Delete(':id')
  async deleteBusinessById(@Param('id') id: string, @Request() request) {
    return this.bussinesService.deleteBusinessById(Number(id), request.user);
  }
}
