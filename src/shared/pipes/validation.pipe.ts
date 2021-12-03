import { PipeTransform, ArgumentMetadata, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { throwValidationException } from '../../utils';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(body, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype || !this.toValidate(metatype)) {
      return body;
    }

    const object = plainToClass(metatype, body);
    const errors = await validate(object);

    if (errors.length > 0) {
      throwValidationException(this.buildErrors(errors));
    }

    return body;
  }

  private buildErrors(errors) {
    const result = {};

    errors.forEach((error) => {
      const property = error.property;

      result[property] = Object.values(error.constraints)[0];
    });

    return result;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];

    return !types.find((type) => metatype === type);
  }
}
