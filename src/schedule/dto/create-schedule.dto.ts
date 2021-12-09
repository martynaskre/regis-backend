import { IsEnum, IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { HigherThan } from 'src/shared/validation/HigherThan';
import { LowerThan } from 'src/shared/validation/LowerThan';
import { Days } from 'src/types';
import { Unique } from '../../shared/validation/Unique';

export class CreateScheduleDto {
  @IsNumber()
  @IsNotEmpty()
  businessId: number;

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
