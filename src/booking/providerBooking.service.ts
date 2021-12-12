import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessService } from '../business/business.service';
import { ProviderEntity } from '../provider/provider.entity';
import {
  PaginatedProviderBookingsResultDto,
  PaginationDto,
} from '../utils/dto/pagination.dto';
import { Repository } from 'typeorm';
import { createProviderBooking } from './dto/create-provider-booking.dto';
import { ProviderBooking } from './providerBooking.entity';
import { throwNotFound } from '../utils';

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
      throwNotFound({ business: 'The business was not found.' });
    }

    const booking = this.providerBookingRepository.create({
      ...bookingData,
      business: business,
    });

    await this.providerBookingRepository.save(booking);

    return booking;
  }

  async getProviderBookings(
    businessId: number,
  ) {
    const totalCount = await this.providerBookingRepository.count({
      where: { business: businessId },
    });

    const bookings = await this.providerBookingRepository
      .createQueryBuilder('providerBooking')
      .where('providerBooking.business = :id', { id: businessId })
      .orderBy('providerBooking.id')
      .getMany();

    if (!bookings) {
      throw new HttpException(
        {
          message: 'Bookings were not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return bookings;
  }

  async getBookingById(id: number) {
    const booking = await this.providerBookingRepository
      .createQueryBuilder('providerBooking')
      .where({ id: id })
      .leftJoinAndSelect('providerBooking.business', 'business')
      .getOne();

    // ar reikia grazinti service, business ir provider

    if (!booking) {
      throw new HttpException(
        {
          message: 'Booking was not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

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
      .limit(paginationDto.limit)
      .getMany();

    // ar reikia grazinti service, business ir provider

    if (!bookings) {
      throw new HttpException(
        {
          message: 'Bookings ware not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: bookings,
    };
  }

  async deleteBookingById(id: number, provider: ProviderEntity) {
    const booking = await this.getBookingById(id);

    if (booking.provider.id !== provider.id || !booking) {
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
