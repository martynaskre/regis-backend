import { IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Days } from 'src/types';

export class CreateScheduleDto {
  @IsNumber()
  @IsNotEmpty()
  businessid: number;

  @IsNotEmpty()
  @IsEnum(Days)
  weekDay: string;

  @IsNotEmpty()
  @Min(0)
  @Max(24)
  @IsInt()
  startHours: number;

  @IsNotEmpty()
  @Min(0)
  @Max(24)
  @IsInt()
  finishHours: number; //int 0-24
}
