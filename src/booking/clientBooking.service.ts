import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
import { throwNotFound } from '../utils';

@Injectable()
export class ClientBookingService {
  constructor(
    @InjectRepository(ClientBooking)
    private readonly clientBookingRepository: Repository<ClientBooking>,
    private readonly serviceService: ServiceService,
  ) {}

  async createBooking(bookingData: CreateClientBookingDto, client: Client) {
    const service = await this.serviceService.getServicesById(
      bookingData.serviceId,
    );

    if (!service) {
      throwNotFound({ service: 'The service was not found.' });
    }

    // PAGALIAU VEIKIA
    console.log(bookingData.reservedTime.toISOString());

    const booking = this.clientBookingRepository.create({
      ...bookingData,
      service: service,
      client: client,
    });

    await this.clientBookingRepository.save(booking);

    return booking;
  }

  async getClientBookings(
    clientId: number,
    paginationDto: PaginationDto,
  ): Promise<PaginatedClientBookingsResultDto> {
    const totalCount = await this.clientBookingRepository.count({
      where: { client: clientId },
    });

    const bookings = await this.clientBookingRepository
      .createQueryBuilder('clientBooking')
      .where('clientBooking.client = :id', { id: clientId })
      .orderBy('clientBooking.id')
      .getMany();

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

  async getBookingById(id: number) {
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
