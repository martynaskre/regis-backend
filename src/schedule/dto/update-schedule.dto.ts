import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Days } from '../../types';

export class UpadteScheduleDto {
  @IsOptional()
  @IsEnum(Days)
  weekDay: number;

  @IsOptional()
  @Min(0)
  @Max(24)
  @IsInt()
  startHours: number;

  @IsOptional()
  @Min(0)
  @Max(24)
  @IsInt()
  finishHours: number;
}
