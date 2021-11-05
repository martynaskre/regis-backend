import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/shared/validation/Match';
import { Unique } from 'src/shared/validation/Unique';

export class CreateClientDto{
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsNotEmpty()
  readonly first_name: string;

  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsNotEmpty()
  readonly last_name: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @MaxLength(255)
  @MinLength(1)
  readonly phone_number: string;

  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsNotEmpty()
  @IsEmail()
  @Unique({
    table: 'clients',
  })
  readonly email: string;

  @IsString()
  @MaxLength(20)
  @MinLength(4)
  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  @Match('password')
  readonly password_confirmation: string;
}
