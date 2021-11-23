import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
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

}
