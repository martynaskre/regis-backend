import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientBooking } from '../booking/clientBooking.entity';
import { PasswordResetEntity } from '../auth/passwor-resets/password-reset.entity';
import { CleanPasswordResetsJob } from './jobs/clean-password-resets.job';
import { RateBusiness } from './jobs/rate-email.job';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PasswordResetEntity, ClientBooking]),
    MailModule,
  ],
  providers: [CleanPasswordResetsJob, RateBusiness],
})
export class CronModule {}
