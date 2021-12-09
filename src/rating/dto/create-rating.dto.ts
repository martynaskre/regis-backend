import { IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsNumber()
  @IsNotEmpty()
  businessId: number;

  @IsNotEmpty()
  @Min(1)
  @Max(5)
  @IsInt()
  rating: number;
}
