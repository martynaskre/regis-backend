import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(1)
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly minPirce: number;

  @IsOptional()
  @IsNumber()
  readonly maxPrice: number;
}

