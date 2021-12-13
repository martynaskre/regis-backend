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
import { ProviderGuard } from 'src/auth/guards/provider.guard';
import {
  PaginatedProviderBookingsResultDto,
  PaginationDto,
} from 'src/utils/dto/pagination.dto';
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

  @UseGuards(ProviderGuard)
  @Get('provider/:providerId')
  async getProviderBookings(@Param('providerId') providerId: string) {
    return this.providerBookingService.getProviderBookings(Number(providerId));
  }

  @UseGuards(ProviderGuard)
  @Get(':id')
  async getBookingById(@Param('id') id: string) {
    return this.providerBookingService.getBookingById(Number(id));
  }

  @UseGuards(ProviderGuard)
  @Get()
  async getBookings(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedProviderBookingsResultDto> {
    return this.providerBookingService.getBookings({
      ...paginationDto,
      limit: paginationDto.limit > 10 ? 10 : paginationDto.limit,
    });
  }

  @UseGuards(ProviderGuard)
  @Delete(':id')
  async deleteBookingById(@Param('id') id: string, @Request() request) {
    return this.providerBookingService.deleteBookingById(
      Number(id),
      request.user,
    );
  }
}
