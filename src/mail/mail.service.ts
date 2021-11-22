import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
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
      this.logger.warn('Error while sending mail.', e);
    }
  }
}
