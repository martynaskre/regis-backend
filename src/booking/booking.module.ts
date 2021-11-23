import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from 'src/business/business.entity';
import { BusinessService } from 'src/business/business.service';
import { Service } from 'src/service/service.entity';
import { ServiceService } from 'src/service/service.service';
import { ClientBookingController } from './clientBooking.controller';
import { ClientBooking } from './clientBooking.entity';
import { ClientBookingService } from './clientBooking.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientBooking, Service, Business])],
  controllers: [ClientBookingController],
  providers: [ClientBookingService, ServiceService, BusinessService],
})
export class BookingModule {}
