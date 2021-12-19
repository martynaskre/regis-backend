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
import { formatResponse } from '../utils';
import { ClientGuard } from '../auth/guards/client.guard';
import { GetBookingsDto } from './dto/get-bookings.dto';
import { BookingsDto } from '../utils/dto/bookings.dto';

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
    await this.bussinesService.createBusiness(business, request.user);

    return formatResponse('Business created.');
  }

  @UseGuards(ProviderGuard)
  @FormDataRequest()
  @Put(':id')
  async updateBusiness(
    @Param('id') id: string,
    @Body() UpdateBusinessBody: UpadateBussinesDto,
    @Request() request,
  ) {
    await this.bussinesService.updateBusiness(
      Number(id),
      UpdateBusinessBody,
      request.user,
    );

    return formatResponse('Business updated.');
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

  @Get(':id')
  async getBusinessById(@Param('id') id: string) {
    const business = await this.bussinesService.getBusinessById(id);

    return formatResponse('Business data.', business);
  }

  @UseGuards(ClientGuard)
  @Get(':id/calendar')
  async getCalendar(
    @Param('id') id: string,
    @Query() bookingsData: GetBookingsDto,
    @Request() request,
  ) {
    const bookingEntries = await this.bussinesService.getBookings(
      id,
      request.user.id,
      bookingsData,
    );

    return formatResponse('Booking calendar list.', bookingEntries);
  }

  @UseGuards(ProviderGuard)
  @Get(':id/bookings')
  async getBookings(
    @Param('id') id: string,
    @Query() bookingsData: BookingsDto,
  ) {
    const bookings = await this.bussinesService.getCalendarBookings(
      Number(id),
      bookingsData,
    );

    return formatResponse('Bookings list.', bookings);
  }

  @UseGuards(ProviderGuard)
  @Delete(':id')
  async deleteBusinessById(@Param('id') id: string, @Request() request) {
    return this.bussinesService.deleteBusinessById(Number(id), request.user);
  }

  @Get(':id/services')
  async getServices(@Param('id') id: string) {
    const services = await this.bussinesService.getServices(id);

    return formatResponse('Services list.', services);
  }
}
