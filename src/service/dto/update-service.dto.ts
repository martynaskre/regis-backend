import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpadateServiceDto {
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  @IsOptional()
  readonly title: string;

  @IsOptional()
  @MaxLength(255)
  @MinLength(1)
  readonly description: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly minPirce: number;

  @IsOptional()
  @IsNumber()
  readonly maxPrice: number;
}
