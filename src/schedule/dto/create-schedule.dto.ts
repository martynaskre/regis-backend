import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateScheduleDto {
  @IsNumber()
  @IsNotEmpty()
  businessid: number;

  @IsNotEmpty()
  weekDay: string;

  @IsNotEmpty()
  startHours: string;

  @IsNotEmpty()
  finishHours: string;
}
