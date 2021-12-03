import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetEntity } from '../auth/passwordResets/passwordReset.entity';
import { CleanPasswordResetsJob } from './jobs/clean-password-resets.job';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordResetEntity])],
  providers: [CleanPasswordResetsJob],
})
export class CronModule {}
