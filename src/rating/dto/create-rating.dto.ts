import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  @IsInt()
  rating: number;
}
