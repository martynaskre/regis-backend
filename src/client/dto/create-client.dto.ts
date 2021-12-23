import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/shared/validation/Match';
import { Unique } from 'src/shared/validation/Unique';

export class CreateClientDto {
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @MaxLength(255)
  @MinLength(1)
  @Unique({
    table: 'clients',
  })
  readonly phoneNumber: string;

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
  readonly passwordConfirmation: string;
}
