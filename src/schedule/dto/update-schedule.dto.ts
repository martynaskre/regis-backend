import { IsEnum, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { Days } from '../../types';
import { HigherThan } from '../../shared/validation/HigherThan';
import { LowerThan } from '../../shared/validation/LowerThan';
import { Unique } from '../../shared/validation/Unique';

export class UpdateScheduleDto {
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
