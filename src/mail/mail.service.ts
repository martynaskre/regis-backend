import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(
    private readonly mailer: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendMail(
    to: string,
    subject: string,
    template: string,
    data: any = {},
  ) {
    try {
      template = path.resolve(__dirname, 'templates', ...template.split('.'));

      return await this.mailer.sendMail({
        to,
        subject,
        template,
        context: {
          frontUrl: this.configService.get('FRONT_URL'),
          ...data,
        },
      });
    } catch (e) {
      this.logger.warn('Error while sending mail.', e);
    }
  }
}
