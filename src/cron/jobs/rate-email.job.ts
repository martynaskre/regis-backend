import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientBooking } from '../../booking/clientBooking.entity';
import { MailService } from '../../mail/mail.service';
import { FrontEndpoint } from '../../types';
import { formatFrontUrl } from '../../utils';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RateBusiness {
  private readonly logger = new Logger(RateBusiness.name);

  constructor(
    @InjectRepository(ClientBooking)
    private readonly clientBookingsRepository: Repository<ClientBooking>,
    private readonly mailServi,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async run() {
    this.logger.log('Running rate business email cron job.');

    const clientBookings = await this.clientBookingsRepository
      .createQueryBuilder('clientBooking')
      .where(
        'DATE_ADD(clientBooking.reservedTime, INTERVAL clientBooking.duration HOUR) < :time',
        { time: new Date() },
      )
      .andWhere('clientBooking.isNotified = :isNotified', { isNotified: false })
      .leftJoinAndSelect('clientBooking.client', 'client')
      .getMany();

    //sukurti uuid

    for (let x = 0; x < clientBookings.length; x++) {
      clientBookings[x].uuid = uuidv4();

      // await this.mailService.sendMail(clientBookings[x].client.email,
      //     'Sveikiname prisijungus!',
      //     'bussines-rating',
      //     {
      //       firstName: clientBookings[x].client.firstName,
      //       actionUrl: formatFrontUrl(FrontEndpoint.CLIENT_LOGIN),
      //     },
      // )

      clientBookings[x].isNotified = true;
      await this.clientBookingsRepository.update(
        clientBookings[x].id,
        clientBookings[x],
      );
    }
  }
}

// SEND EMAILS TO THEM
//      loop through all users
//      get user by its id
//      send email with user.email
//          create tamplate
//          put link to create business endpoint
//          uuid
// SET isNotified TO true
