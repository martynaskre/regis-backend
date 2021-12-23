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
  readonly firstName: string;

  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsNotEmpty()
  readonly lastName: string;

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
  @Unique({
    table: 'providers',
  })
  readonly phoneNumber: string;

  @IsString()
  @MaxLength(20)
  @MinLength(4)
  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  @Match('password')
  readonly passwordConfirmation: string;

  @IsNotEmpty()
  @IsIn(['0', '1'])
  readonly isLegalEntity: string;

  @ValidateIf((object) => object.is_legal_entity == 1)
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsNotEmpty()
  readonly companyName: string;

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
  readonly vatCode: string;
}
