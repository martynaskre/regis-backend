import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientBookingController } from './clientBooking.controller';
import { ClientBooking } from './clientBooking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientBooking])],
  controllers: [ClientBookingController],
  providers: [],
})
export class BookingModule {}
