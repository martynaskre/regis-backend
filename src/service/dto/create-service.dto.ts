import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateServiceDto {
  @IsNumber()
  @IsNotEmpty()
  businessId: number;

  @IsString()
  @MaxLength(50)
  @MinLength(1)
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(1)
  readonly description: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly minPrice: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly maxPrice: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  readonly duration: number;
}
