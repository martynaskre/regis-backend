import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../../shared/validation/Match';

export class ResetPasswordDto {
  @IsNotEmpty()
  public token: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsString()
  @MaxLength(20)
  @MinLength(4)
  @IsNotEmpty()
  public password: string;

  @IsNotEmpty()
  @Match('password')
  readonly passwordConfirmation: string;
}
