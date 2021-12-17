import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { IsStartOfTheWeek } from '../../shared/validation/IsStartOfTheWeek';
import * as dayjs from 'dayjs';

export class GetBookingsDto {
  @Type(() => Date)
  @IsDate()
  @IsStartOfTheWeek()
  readonly startDate: Date = dayjs().isoWeekday(1).toDate();
}
