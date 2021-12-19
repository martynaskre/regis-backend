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
    private readonly mailService: MailService,
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

    for (let x = 0; x < clientBookings.length; x++) {
      clientBookings[x].uuid = uuidv4();
      await this.mailService.sendMail(
        clientBookings[x].client.email,
        'Ivertinikite savo patirti!',
        'bussines-rating',
        {
          service: clientBookings[x].service.title,
          actionUrl: formatFrontUrl(FrontEndpoint.CLIENT_LOGIN),
        },
      );
      clientBookings[x].isNotified = true;
      await this.clientBookingsRepository.update(
        clientBookings[x].id,
        clientBookings[x],
      );
    }
  }
}
