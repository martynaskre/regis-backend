import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LogInClientDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
