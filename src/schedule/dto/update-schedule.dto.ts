import { IsOptional } from 'class-validator';

export class UpadteScheduleDto {
  @IsOptional()
  weekDay: string;

  @IsOptional()
  startHours: string;

  @IsOptional()
  finishHours: string; //int 0-24
}
