import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordResetEntity } from '../../auth/passwor-resets/password-reset.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CleanPasswordResetsJob {
  private readonly logger = new Logger(CleanPasswordResetsJob.name);

  constructor(
    @InjectRepository(PasswordResetEntity)
    private readonly passwordResetRepository: Repository<PasswordResetEntity>,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async run() {
    this.logger.log('Running password resets cleaning cron job.');

    await this.passwordResetRepository
      .createQueryBuilder('password_reset')
      .delete()
      .where('expiresAt <= :date', {
        date: new Date(),
      })
      .execute();
  }
}
