/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  PaginatedClientBookingsResultDto,
  PaginationDto,
} from '../utils/dto/pagination.dto';
import { ClientGuard } from '../auth/guards/client.guard';
import { ClientBookingService } from './clientBooking.service';
import { CreateClientBookingDto } from './dto/create-client-booking.dto';
import { formatResponse } from '../utils';
import { BookingsDto } from '../utils/dto/bookings.dto';

@Controller('clientBooking')
export class ClientBookingController {
  constructor(private readonly clientBookingService: ClientBookingService) {}

  @UseGuards(ClientGuard)
  @Post()
  async createBooking(
    @Request() request,
    @Body() booking: CreateClientBookingDto,
  ) {
    return this.clientBookingService.createBooking(booking, request.user);
  }

  @UseGuards(ClientGuard)
  @Get('client')
  async getClientBookings(
    @Request() request,
    @Query() bookingsData: BookingsDto,
  ) {
    const clientBookings = await this.clientBookingService.getClientBookings(
      request.user.id,
      bookingsData,
    );

    return formatResponse('Client bookings.', clientBookings);
  }

  @Get(':id')
  async getBookingById(@Param('id') id: string) {
    const booking = await this.clientBookingService.getBookingById(Number(id));

    return formatResponse('Client booking.', booking);
  }

  @UseGuards(ClientGuard)
  @Get()
  async getBookings(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedClientBookingsResultDto> {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);

    return this.clientBookingService.getBookings({
      ...paginationDto,
      limit: paginationDto.limit > 10 ? 10 : paginationDto.limit,
    });
  }

  @UseGuards(ClientGuard)
  @Delete(':id')
  async deleteBookingById(@Param('id') id: string, @Request() request) {
    return this.clientBookingService.deleteBookingById(
      Number(id),
      request.user,
    );
  }
}
