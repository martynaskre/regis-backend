import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Exists } from '../../shared/validation/Exists';

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
  readonly addressCountry: string;

  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsNotEmpty()
  readonly addressCity: string;

  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsNotEmpty()
  readonly addressStreet: string;

  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(1)
  readonly addressHouseNumber: string;

  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(1)
  readonly addressPostCode: string;

  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(1)
  readonly shortDescription: string;

  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(1)
  readonly longDescription: string;

  //@IsNotEmpty()
  //@Exists({
  //  table: 'categories',
  //  column: 'id',
  //})
  //readonly categoryId: number;
}
