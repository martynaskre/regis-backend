import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { FrontEndpoint } from '../types';
import slugify from 'slugify';
import { MemoryStoredFile } from 'nestjs-form-data';
import * as crypto from 'crypto';
import { Storage } from '@squareboat/nest-storage';

const saltRounds = 10;

export async function hash(value: string): Promise<string> {
  return await bcrypt.hash(value, saltRounds);
}

export async function compareHash(
  value: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(value, hash);
}

export function formatResponse(message: string, data?: any) {
  return {
    message,
    data,
  };
}

export function throwValidationException(
  errors: any,
  message = 'The given data was invalid.',
) {
  throw new HttpException(
    {
      message,
      errors,
    },
    HttpStatus.UNPROCESSABLE_ENTITY,
  );
}

export function throwNotFound(errors: any, message = 'Not found.') {
  throw new HttpException(
    {
      message,
      errors,
    },
    HttpStatus.NOT_FOUND,
  );
}

export function formatFrontUrl(
  endpoint: FrontEndpoint,
  parameters: Record<string, string> = {},
) {
  const urlParams = new URLSearchParams(parameters);
  const url = process.env.FRONT_URL + endpoint;

  return Object.keys(parameters).length > 0
    ? url + '?' + urlParams.toString()
    : url;
}

export function generateSlug(str: string) {
  return slugify(str, {
    lower: true,
  });
}

export async function storeFile(
  path: string,
  file: MemoryStoredFile,
  disk = 'public',
) {
  const fileExtension = file.originalName.split('.')[1];

  const filename =
    crypto
      .createHash('md5')
      .update(file.originalName + new Date().getTime().toString())
      .digest('hex') + `.${fileExtension}`;

  await Storage.disk(disk).put(`${path}/${filename}`, file.buffer);

  return filename;
}

export function getFileUrl(path: string, disk = 'public') {
  const config = Storage.disk(disk).getConfig();

  return config.baseUrl + path;
}
