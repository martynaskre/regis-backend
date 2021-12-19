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

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
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
