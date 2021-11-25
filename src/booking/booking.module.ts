import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from 'src/business/business.entity';
import { BusinessService } from 'src/business/business.service';
import { Service } from 'src/service/service.entity';
import { ServiceService } from 'src/service/service.service';
import { ClientBookingController } from './clientBooking.controller';
import { ClientBooking } from './clientBooking.entity';
import { ClientBookingService } from './clientBooking.service';
import { ProviderBookingController } from './provicerBooking.controller';
import { ProviderBooking } from './providerBooking.entity';
import { ProviderBookingService } from './providerBooking.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientBooking, Service, Business, ProviderBooking])],
  controllers: [ClientBookingController, ProviderBookingController],
  providers: [ClientBookingService, ServiceService, BusinessService , ProviderBookingService],
})
export class BookingModule {}
