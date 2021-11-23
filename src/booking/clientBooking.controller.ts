import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ClientGuard } from '../auth/guards/client.guard';

@Controller('clientBooking')
export class ClientBookingController {
  @UseGuards(ClientGuard)
  @Post()
  async createBooking(@Request() request) {
    return console.log(request.user);
  }
}
