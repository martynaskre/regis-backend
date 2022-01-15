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
import { MailModule } from '../mail/mail.module';
import { ProviderEntity } from '../provider/provider.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientBooking,
      Service,
      Business,
      ProviderBooking,
      ProviderEntity,
    ]),
    MailModule,
  ],
  controllers: [ClientBookingController, ProviderBookingController],
  providers: [
    BusinessService,
    ServiceService,
    ClientBookingService,
    ProviderBookingService,
  ],
})
export class BookingModule {}
