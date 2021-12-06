import { IsEnum, IsOptional } from 'class-validator';
import { Days } from '../../types';

export class UpadteScheduleDto {
  @IsOptional()
  @IsEnum(Days)
  weekDay: string;

  @IsOptional()
  startHours: string;

  @IsOptional()
  finishHours: string; //int 0-24
}
