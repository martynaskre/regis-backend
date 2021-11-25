import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class createProviderBooking {
  @IsNumber()
  @IsNotEmpty()
  businessId: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  reservedTime: Date;
}
