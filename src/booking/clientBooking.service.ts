/* eslint-disable prettier/prettier */
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
import { BookingEntry, Days} from '../types';
import * as dayjs from 'dayjs';
import { BookingsDto } from '../utils/dto/bookings.dto';
import { MailService } from '../mail/mail.service';
import { ProviderEntity } from '../provider/provider.entity';
import { Business } from '../business/business.entity';
import { Service } from '../service/service.entity';

@Injectable()
export class ClientBookingService {
  private readonly logger = new Logger(ClientBookingService.name);

  constructor(
    @InjectRepository(ClientBooking)
    private readonly clientBookingRepository: Repository<ClientBooking>,
    @InjectRepository(ProviderEntity)
    private readonly providerRepository: Repository<ProviderEntity>,
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    private readonly serviceService: ServiceService,
    private readonly businessService: BusinessService,
    private readonly mailService: MailService,
  ) {}

  async createBooking(bookingData: CreateClientBookingDto, client: Client) {
    this.logger.log('Creating new client booking');

    const currentTime = new Date();

    if(bookingData.reservedTime.getTime() < currentTime.getTime())
    {
      throwValidationException({
        reservedTime: 'Booking date invalid',
      });
    }

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

    await this.mailService.sendMail(
      client.email,
      'Paslaugos rezervacija sėkminga!',
      'client-new-booking',
      {
        firstName: client.firstName,
        service: service.title,
        time: dayjs(bookingData.reservedTime).format('YYYY-MM-DD HH:mm:ss'),
      },
    );

    const provider = await this.providerRepository
      .createQueryBuilder('provider')
      .whereExists(
        this.businessRepository
          .createQueryBuilder('business')
          .where('provider.id = business.providerId')
          .whereExists(
            this.serviceRepository
              .createQueryBuilder('service')
              .where('service.business = business.id')
              .where('service.id = :serviceId', {
                serviceId: bookingData.serviceId,
              }),
          ),
      )
      .getOne();

    await this.mailService.sendMail(
      provider.email,
      'Gauta nauja rezervacija!',
      'provider-new-booking',
      {
        firstName: provider.firstName,
        service: service.title,
        time: dayjs(bookingData.reservedTime).format('YYYY-MM-DD HH:mm:ss'),
      },
    );

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

    const currentTime  = new Date();

    if(booking.reservedTime.getTime()  - currentTime.getTime() < 86400000)
    {
      throwValidationException({
        reservedTime: 'Can not cancel booking later than 24 hours before the appointment',
      });
    }


    await this.mailService.sendMail(
      client.email,
      'Paslaugos rezervacija atšaukimas sėkmingas!',
      'client-cancel-booking',
      {
        firstName: client.firstName,
        service: booking.service.title,
        time: dayjs(booking.reservedTime).format('YYYY-MM-DD HH:mm:ss'),
      },
    );

    const provider = await this.providerRepository
    .createQueryBuilder('provider')
    .whereExists(
      this.businessRepository
        .createQueryBuilder('business')
        .where('provider.id = business.providerId')
        .whereExists(
          this.serviceRepository
            .createQueryBuilder('service')
            .where('service.business = business.id')
            .where('service.id = :serviceId', {
              serviceId: booking.service.id,
            }),
        ),
    )
    .getOne();

    await this.mailService.sendMail(
      provider.email,
      'Rezervacija atšaukta',
      'provider-canceled-booking',
      {
        firstName: provider.firstName,
        service: booking.service.title,
        time: dayjs(booking.reservedTime).format('YYYY-MM-DD HH:mm:ss'),
      },
    );

    await this.clientBookingRepository
      .createQueryBuilder('clientBooking')
      .delete()
      .where({ id: id })
      .execute();

    return 'client Booking deleted';
  }
}
