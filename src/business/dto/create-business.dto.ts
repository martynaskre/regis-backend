import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Exists } from '../../shared/validation/Exists';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';

export class CreateBussinesDto {
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @MaxLength(50)
  @MinLength(1)
  @IsNotEmpty()
  readonly addressCountry: string;

  @IsString()
  @MaxLength(50)
  @MinLength(1)
  @IsNotEmpty()
  readonly addressCity: string;

  @IsString()
  @MaxLength(50)
  @MinLength(1)
  @IsNotEmpty()
  readonly addressStreet: string;

  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(1)
  readonly addressHouseNumber: string;

  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(1)
  readonly addressPostCode: string;

  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(1)
  readonly shortDescription: string;

  @IsNotEmpty()
  @MaxLength(1000)
  @MinLength(1)
  readonly longDescription: string;

  @IsNotEmpty()
  @Exists({
    table: 'categories',
    column: 'id',
  })
  readonly categoryId: number;

  @IsNotEmpty()
  @IsFile()
  @MaxFileSize(2e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  readonly cover: MemoryStoredFile;

  @IsNotEmpty()
  @IsFile()
  @MaxFileSize(2e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  readonly logo: MemoryStoredFile;
}
