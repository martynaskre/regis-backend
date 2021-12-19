import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessController } from './business.controller';
import { Business } from './business.entity';
import { BusinessService } from './business.service';
import { Service } from '../service/service.entity';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ClientBooking } from '../booking/clientBooking.entity';
import { BusinessSubscriber } from './business.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([Business, Service, ClientBooking]),
    NestjsFormDataModule,
  ],
  controllers: [BusinessController],
  providers: [BusinessService, BusinessSubscriber],
})
export class BusinessModule {}
