import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/client/client.entity';
import { ServiceService } from 'src/service/service.service';
import {
  PaginatedClientBookingsResultDto,
  PaginationDto,
} from '../utils/dto/pagination.dto';
import { Repository } from 'typeorm';
import { ClientBooking } from './clientBooking.entity';
import { CreateClientBookingDto } from './dto/create-client-booking.dto';
import { throwNotFound, throwValidationException } from '../utils';
import { BusinessService } from 'src/business/business.service';
import { BookingEntry, Days } from '../types';
import * as dayjs from 'dayjs';
import { BookingsDto } from '../utils/dto/bookings.dto';

@Injectable()
export class ClientBookingService {
  private readonly logger = new Logger(ClientBookingService.name);

  constructor(
    @InjectRepository(ClientBooking)
    private readonly clientBookingRepository: Repository<ClientBooking>,
    private readonly serviceService: ServiceService,
    private readonly businessService: BusinessService,
  ) {}

  async createBooking(bookingData: CreateClientBookingDto, client: Client) {
    this.logger.log('Creating new client booking');

    const service = await this.serviceService.getServicesById(
      bookingData.serviceId,
    );

    if (!service) {
      throwNotFound({ service: 'The service was not found.' });
    }

    const bookings = await this.businessService.getBookings(
      service.business.id,
      client.id,
      { startDate: dayjs(bookingData.reservedTime).isoWeekday(1).toDate() },
    );

    for (let x = 0; x < bookings.length; x++) {
      if (
        bookings[x].reservedTime.toISOString() ===
          bookingData.reservedTime.toISOString() ||
        (bookings[x].reservedTime.getTime() + bookings[x].duration * 3600000 >
          bookingData.reservedTime.getTime() &&
          bookings[x].reservedTime.getTime() <
            bookingData.reservedTime.getTime()) ||
        (bookings[x].reservedTime.getTime() >
          bookingData.reservedTime.getTime() &&
          bookings[x].reservedTime.getTime() <
            bookingData.reservedTime.getTime() + service.duration * 3600000)
      ) {
        throwValidationException({
          reservedTime: 'This time is already booked',
        });
      }
    }

    const booking = this.clientBookingRepository.create({
      ...bookingData,
      service: service,
      duration: service.duration,
      client: client,
    });

    await this.clientBookingRepository.save(booking);

    return booking;
  }

  async getClientBookings(
    clientId: number,
    bookingsData: BookingsDto = new BookingsDto(),
  ) {
    this.logger.log('Getting client bookings');

    const startDate = dayjs(bookingsData.startDate);

    const rawClientBookings = await this.clientBookingRepository
      .createQueryBuilder('clientBooking')
      .where('clientBooking.clientId = :clientId', {
        clientId,
      })
      .andWhere(
        'DATE(clientBooking.reservedTime) BETWEEN :startDate AND :finishDate',
        {
          startDate: startDate.format('YYYY-MM-DD'),
          finishDate: startDate.isoWeekday(Days.SUNDAY).format('YYYY-MM-DD'),
        },
      )
      .leftJoinAndSelect('clientBooking.service', 'service')
      .getMany();

    const clientBookings: BookingEntry[] = [];

    for (const rawClientBooking of rawClientBookings) {
      clientBookings.push({
        type: 'default',
        reservedTime: rawClientBooking.reservedTime,
        duration: rawClientBooking.duration,
        title: rawClientBooking.service.title,
        description: rawClientBooking.service.description,
        id: rawClientBooking.id,
      });
    }

    return clientBookings;
  }

  async getBookingById(id: number) {
    this.logger.log('Getting client booking by id');

    const booking = await this.clientBookingRepository
      .createQueryBuilder('clientBooking')
      .where({ id: id })
      .leftJoinAndSelect('clientBooking.client', 'client')
      .leftJoinAndSelect('clientBooking.service', 'service')
      .leftJoinAndSelect('service.business', 'business')
      .getOne();

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
  ): Promise<PaginatedClientBookingsResultDto> {
    this.logger.log('Getting all bookings');

    const totalCount = await this.clientBookingRepository.count();

    const bookings = await this.clientBookingRepository
      .createQueryBuilder('clientBooking')
      .orderBy('clientBooking.id')
      .leftJoinAndSelect('clientBooking.client', 'client')
      .leftJoinAndSelect('clientBooking.service', 'service')
      .leftJoinAndSelect('service.business', 'business')
      .getMany();

    console.log(paginationDto);

    if (!bookings) {
      throw new HttpException(
        {
          message: 'Bookings were not found',
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

  async deleteBookingById(id: number, client: Client) {
    this.logger.log('Deleting client booking by id');

    const booking = await this.getBookingById(id);

    if (!booking || booking.client.id !== client.id) {
      throw new HttpException(
        {
          message: "The id's dont match.",
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.clientBookingRepository
      .createQueryBuilder('clientBooking')
      .delete()
      .where({ id: id })
      .execute();

    return 'client Booking deleted';
  }
}
