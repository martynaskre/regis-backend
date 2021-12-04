import { PaginationDto } from '../../utils/dto/pagination.dto';

export class GetBusinessDto extends PaginationDto {
  readonly category: number;

  readonly query: string;
}
