import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    @InjectQueue('mail')
    private readonly mailQueue: Queue,
  ) {}

  async sendMail(
    to: string,
    subject: string,
    template: string,
    data: any = {},
  ) {
    this.logger.log('Adding email sending to queue...');

    await this.mailQueue.add('send', {
      to,
      subject,
      template,
      data,
    });
  }
}
