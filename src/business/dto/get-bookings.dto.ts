import * as dayjs from 'dayjs';
import { BookingsDto } from '../../utils/dto/bookings.dto';
import { IsNotPastWeek } from '../../shared/validation/IsNotPastWeek';

export class GetBookingsDto extends BookingsDto {
  @IsNotPastWeek()
  readonly startDate: Date = dayjs().isoWeekday(1).toDate();
}
