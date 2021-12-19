import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientBooking } from '../../booking/clientBooking.entity';
import { MailService } from '../../mail/mail.service';
import { FrontEndpoint } from '../../types';
import { formatFrontUrl } from '../../utils';
import { Repository } from 'typeorm';


@Injectable()
export class RateBusiness {
  private readonly logger = new Logger(RateBusiness.name);

  constructor(
    @InjectRepository(ClientBooking)
    private readonly clientBookingsRepository: Repository<ClientBooking>,
    private readonly mailService: MailService,

  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async run() {
    this.logger.log('Running rate business email cron job.');

    const clientBookings = await this.clientBookingsRepository.createQueryBuilder('clientBooking')
    .where('DATE_ADD(clientBooking.reservedTime, INTERVAL clientBooking.duration HOUR) < :time', {time: new Date()})
    .andWhere('clientBooking.isNotified = :isNotified' ,{isNotified: false})
    .leftJoinAndSelect('clientBooking.client', 'client')
    .getMany();

    //sukurti uuid

    for(let x = 0; x < clientBookings.length; x++)
    {
        // await this.mailService.sendMail(clientBookings[x].client.email,
        //     'Sveikiname prisijungus!',
        //     'bussines-rating',
        //     {
        //       firstName: clientBookings[x].client.firstName,
        //       actionUrl: formatFrontUrl(FrontEndpoint.CLIENT_LOGIN),
        //     },
        // )
        //clientBookings[x].isNotified = true;
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
