import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { PaginatedClientBookingsResultDto, PaginationDto } from 'src/utils/dto/pagination.dto';
import { ClientGuard } from '../auth/guards/client.guard';
import { ClientBookingService } from './clientBooking.service';
import { CreateClientBookingDto } from './dto/create-client-Booking.dto';

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

  //@UseGuards(ClientGuard)
  @Get(":id")
  async getBookingById(@Param('id') id: string) {
    return this.clientBookingService.getBookingById(Number(id));
  }

  @Get()
  async getBusinesses(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedClientBookingsResultDto> {
    return this.clientBookingService.getBookings({
      ...paginationDto,
      limit: paginationDto.limit > 10 ? 10 : paginationDto.limit,
    });
  }

}
