import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
} from 'class-validator';
import { HigherThan } from 'src/shared/validation/HigherThan';
import { LowerThan } from 'src/shared/validation/LowerThan';
import { Days } from 'src/types';

export class CreateScheduleDto {
  @IsNumber()
  @IsNotEmpty()
  businessid: number;

  @IsNotEmpty()
  @IsEnum(Days)
  weekDay: number;

  @IsNotEmpty()
  @Min(0)
  @Max(24)
  @IsInt()
  @LowerThan('finishHours')
  startHours: number;

  @IsNotEmpty()
  @Min(0)
  @Max(24)
  @IsInt()
  @HigherThan('startHours')
  finishHours: number;
}
