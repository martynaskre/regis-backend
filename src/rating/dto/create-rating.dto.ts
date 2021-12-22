import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRatingDto {
  @Type(() => Number)
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  @IsInt()
  rating: number;
}
