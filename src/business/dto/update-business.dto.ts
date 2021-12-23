import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { Exists } from '../../shared/validation/Exists';

export class UpadateBussinesDto {
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  @IsOptional()
  readonly title: string;

  @IsString()
  @MaxLength(50)
  @MinLength(1)
  @IsOptional()
  readonly addressCountry: string;

  @IsString()
  @MaxLength(50)
  @MinLength(1)
  @IsOptional()
  readonly addressCity: string;

  @IsString()
  @MaxLength(50)
  @MinLength(1)
  @IsOptional()
  readonly addressStreet: string;

  @IsOptional()
  @MaxLength(50)
  @MinLength(1)
  readonly addressHouseNumber: string;

  @IsOptional()
  @MaxLength(50)
  @MinLength(1)
  readonly addressPostCode: string;

  @IsOptional()
  @MaxLength(255)
  @MinLength(1)
  readonly shortDescription: string;

  @IsOptional()
  @MaxLength(1000)
  @MinLength(1)
  readonly longDescription: string;

  @IsOptional()
  @IsNotEmpty()
  @Exists({
    table: 'categories',
    column: 'id',
  })
  readonly categoryId: number;

  @IsOptional()
  @IsFile()
  @MaxFileSize(2e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  readonly cover?: MemoryStoredFile;

  @IsOptional()
  @IsFile()
  @MaxFileSize(2e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  readonly logo?: MemoryStoredFile;
}
