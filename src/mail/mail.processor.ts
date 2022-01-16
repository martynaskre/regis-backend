import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

@Processor('mail')
export class MailProcessor {
  private readonly logger = new Logger(MailProcessor.name);

  constructor(
    private readonly mailer: MailerService,
    private readonly configService: ConfigService,
  ) {}

  @Process('send')
  async handleSending(job: Job) {
    const { to, subject, template, data } = job.data;

    try {
      const realTemplate = path.resolve(
        __dirname,
        'templates',
        ...template.split('.'),
      );

      return await this.mailer.sendMail({
        to,
        subject,
        template: realTemplate,
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
