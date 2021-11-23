import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/client/client.entity';
import { ServiceService } from 'src/service/service.service';
import { Repository } from 'typeorm';
import { ClientBooking } from './clientBooking.entity';
import { CreateClientBookingDto } from './dto/create-client-Booking.dto';

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
      throw new HttpException(
        {
          message: 'Service was not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const booking = this.clientBookingRepository.create({
      ...bookingData,
      service: service,
      client: client,
    });

    await this.clientBookingRepository.save(booking);

    return booking;
  }

  async getBookingById(id: number) {
    const booking = await this.clientBookingRepository
      .createQueryBuilder('clientBooking')
      .where({ id: id })
      .leftJoinAndSelect('clientBooking.client', 'client')
      .leftJoinAndSelect('clientBooking.service', 'service')
      .leftJoinAndSelect('service.business', 'business')
      .getOne();
    return booking;
  }

}
