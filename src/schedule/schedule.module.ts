import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from '../business/business.entity';
import { Service } from '../service/service.entity';
import { BusinessService } from '../business/business.service';
import { ScheduleController } from './schedule.controller';
import { Schedule } from './schedule.entity';
import { ScheduleService } from './schedule.service';
import { ClientBooking } from '../booking/clientBooking.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule, Business, Service, ClientBooking]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService, BusinessService],
})
export class SchedulesModule {}
