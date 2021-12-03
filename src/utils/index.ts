import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';

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
