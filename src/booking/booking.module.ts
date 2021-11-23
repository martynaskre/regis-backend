import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientBookingController } from './clientBooking.controller';
import { ClientBooking } from './clientBooking.entity';
import { ClientBookingService } from './clientBooking.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientBooking])],
  controllers: [ClientBookingController],
  providers: [ClientBookingService],
})
export class BookingModule {}
