import { IsEmail, IsNotEmpty } from 'class-validator';

export class LogInClientDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
