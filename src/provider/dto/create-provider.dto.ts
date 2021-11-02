import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateProviderDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
