import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailer: MailerService) {}

  async sendMail(
    to: string,
    subject: string,
    template: string,
    data: any = {},
  ) {
    try {
      template = path.join(__dirname, 'templates', ...template.split('.'));

      return await this.mailer.sendMail({
        to,
        subject,
        template,
        context: data,
      });
    } catch (e) {
      console.log('Error while sending mail.', e);
    }
  }
}
