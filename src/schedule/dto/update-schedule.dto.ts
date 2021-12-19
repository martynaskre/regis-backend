import { IsEnum, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { Days } from '../../types';
import { HigherThan } from '../../shared/validation/HigherThan';
import { LowerThan } from '../../shared/validation/LowerThan';
import { Unique } from '../../shared/validation/Unique';
import { Type } from 'class-transformer';

export class UpdateScheduleDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsEnum(Days)
  @Unique({
    table: 'schedule',
    wheres: [
      {
        column: 'businessId',
        formField: 'businessId',
      },
    ],
  })
  weekDay: number;

  @Type(() => Number)
  @IsNotEmpty()
  @Min(0)
  @Max(24)
  @IsInt()
  @LowerThan('finishHours')
  startHours: number;

  @Type(() => Number)
  @IsNotEmpty()
  @Min(0)
  @Max(24)
  @IsInt()
  @HigherThan('startHours')
  finishHours: number;
}
