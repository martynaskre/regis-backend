import { IsDate, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Days } from 'src/types';

export class CreateScheduleDto {
  @IsNumber()
  @IsNotEmpty()
  businessid: number;

  @IsNotEmpty()
  @IsEnum(Days)
  weekDay: string;

  @IsNotEmpty()
  startHours: string;

  @IsNotEmpty()
  finishHours: string; //int 0-24
}
