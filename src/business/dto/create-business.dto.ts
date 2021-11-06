import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBussinesDto {
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsNotEmpty()
  readonly address_country: string;

  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsNotEmpty()
  readonly address_city: string;

  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsNotEmpty()
  readonly address_street: string;

  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(1)
  readonly address_house_number: string;

  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(1)
  readonly address_post_code: string;

  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(1)
  readonly short_description: string;

  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(1)
  readonly long_description: string;
}
