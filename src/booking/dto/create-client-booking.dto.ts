import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateClientBookingDto {
  @IsNumber()
  @IsNotEmpty()
  serviceId: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  reservedTime: Date;
}
