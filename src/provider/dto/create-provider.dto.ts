import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Unique } from '../../shared/validation/Unique';
import { Match } from '../../shared/validation/Match';

export class CreateProviderDto {
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

  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsNotEmpty()
  @IsEmail()
  @Unique({
    table: 'providers',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @MaxLength(255)
  @MinLength(1)
  readonly phone_number: string;

  @IsString()
  @MaxLength(20)
  @MinLength(4)
  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  @Match('password')
  readonly password_confirmation: string;

  @IsNotEmpty()
  @IsIn(['0', '1'])
  readonly is_legal_entity: string;

  @ValidateIf((object) => object.is_legal_entity == 1)
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsNotEmpty()
  readonly company_name: string;

  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsNotEmpty()
  readonly code: string;

  @ValidateIf((object) => object.is_legal_entity == 1)
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsNotEmpty()
  readonly vat_code: string;
}
