import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
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
}
