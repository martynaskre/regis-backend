import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpadateBussinesDto {
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  @IsOptional()
  readonly title: string;

  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsOptional()
  readonly addressCountry: string;

  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsOptional()
  readonly addressCity: string;

  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsOptional()
  readonly addressStreet: string;

  @IsOptional()
  @MaxLength(255)
  @MinLength(1)
  readonly addressHouseNumber: string;

  @IsOptional()
  @MaxLength(255)
  @MinLength(1)
  readonly addressPostCode: string;

  @IsOptional()
  @MaxLength(255)
  @MinLength(1)
  readonly shortDescription: string;

  @IsOptional()
  @MaxLength(255)
  @MinLength(1)
  readonly longDescription: string;
}
