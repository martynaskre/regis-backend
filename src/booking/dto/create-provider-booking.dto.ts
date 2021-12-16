import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class createProviderBooking {
  @IsNumber()
  @IsNotEmpty()
  businessId: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  reservedTime: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  readonly duration: number;
}
