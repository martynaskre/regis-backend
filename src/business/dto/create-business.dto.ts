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
    @IsPhoneNumber()
    @MaxLength(255)
    @MinLength(1)
    readonly address_house_number: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    @MaxLength(255)
    @MinLength(1)
    readonly address_post_code: string;
  
    @IsNotEmpty()
    @IsPhoneNumber()
    @MaxLength(255)
    @MinLength(1)
    readonly short_description: string;
  
    @IsNotEmpty()
    @IsPhoneNumber()
    @MaxLength(255)
    @MinLength(1)
    readonly long_description: string;
  
  }
  