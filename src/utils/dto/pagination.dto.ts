import { ClientBooking } from 'src/booking/clientBooking.entity';
import { Business } from '../../business/business.entity';
import { Service } from '../../service/service.entity';

export class PaginationDto {
  page = 1;
  limit = 10;
}
export class PaginatedBusinessesResultDto extends PaginationDto {
  data: Business[];
  totalCount: number;
}
export class PaginatedServicesResultDto extends PaginationDto {
  data: Service[];
  totalCount: number;
}
export class PaginatedClientBookingsResultDto extends PaginationDto {
  data: ClientBooking[];
  totalCount: number;
}
