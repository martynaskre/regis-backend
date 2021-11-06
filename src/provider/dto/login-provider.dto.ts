import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginProviderDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
