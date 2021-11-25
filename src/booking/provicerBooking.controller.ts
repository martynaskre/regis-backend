import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ProviderGuard } from 'src/auth/guards/provider.guard';
import { createProviderBooking } from './dto/create-provider-booking.dto';
import { ProviderBookingService } from './providerBooking.service';

@Controller('providerBooking')
export class ProviderBookingController {
  constructor(
    private readonly providerBookingService: ProviderBookingService,
  ) {}

  @Post()
  @UseGuards(ProviderGuard)
  async createBooking(
    @Request() request,
    @Body() booking: createProviderBooking,
  ) {
    return this.providerBookingService.createBooking(request.user, booking);
  }
}
