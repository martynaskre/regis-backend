import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientBooking } from 'src/booking/clientBooking.entity';
import { Repository } from 'typeorm';


@Injectable()
export class RateBusiness {
  private readonly logger = new Logger(RateBusiness.name);

  constructor(
    @InjectRepository(ClientBooking)
    private readonly clientBookingsRepository: Repository<ClientBooking>,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async run() {
    this.logger.log('Running rate business email cron job.');

    const clientBookings = await this.clientBookingsRepository.createQueryBuilder('clientBooking')
    .where('DATE_ADD(clientBooking.reservedTime, INTERVAL clientBooking.duration HOUR) < :time', {time: new Date()})
    .getMany();

    console.log(clientBookings)
    console.log( new Date())

  }
}


// FIX CRON JOB
// ADD FIELD TO CLIENT BOOKING isNotified
// GET ALL CLIENT BOOKINGS WHERE DATE.NOW > RESERVED TIME + DURATION AND !== isNotified
// SEND EMAILS TO THEM
