import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessService } from 'src/business/business.service';
import { ProviderEntity } from 'src/provider/provider.entity';
import {
  PaginatedProviderBookingsResultDto,
  PaginationDto,
} from 'src/utils/dto/pagination.dto';
import { Repository } from 'typeorm';
import { createProviderBooking } from './dto/create-provider-booking.dto';
import { ProviderBooking } from './providerBooking.entity';

@Injectable()
export class ProviderBookingService {
  constructor(
    @InjectRepository(ProviderBooking)
    private readonly providerBookingRepository: Repository<ProviderBooking>,
    private readonly businessService: BusinessService,
  ) {}

  async createBooking(
    provider: ProviderEntity,
    bookingData: createProviderBooking,
  ) {
    const business = await this.businessService.getBusinessById(
      bookingData.businessId,
    );

    if (!business || business.provider.id !== provider.id) {
      throw new HttpException(
        {
          message: 'Service was not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const booking = this.providerBookingRepository.create({
      ...bookingData,
      business: business,
    });

    await this.providerBookingRepository.save(booking);

    return booking;
  }

  async getBookingById(id: number) {
    const booking = await this.providerBookingRepository
      .createQueryBuilder('providerBooking')
      .where({ id: id })
      .leftJoinAndSelect('providerBooking.business', 'business')
      .getOne();
    return booking;
  }

  async getBookings(
    paginationDto: PaginationDto,
  ): Promise<PaginatedProviderBookingsResultDto> {
    const totalCount = await this.providerBookingRepository.count();

    const bookings = await this.providerBookingRepository
      .createQueryBuilder('providerBooking')
      .orderBy('providerBooking.id')
      .leftJoinAndSelect('providerBooking.business', 'business')
      .getMany();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: bookings,
    };
  }

  async deleteBookingById(id: number, provider: ProviderEntity) {
    const booking = await this.getBookingById(id);

    if (booking.provider.id !== provider.id && !booking) {
      throw new HttpException(
        {
          message: "The id's dont match.",
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.providerBookingRepository
      .createQueryBuilder('providerBooking')
      .delete()
      .where({ id: id })
      .execute();

    return 'provider Booking deleted';
  }
}
