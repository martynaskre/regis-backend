import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { getConnection } from 'typeorm';

interface ExistsOptions extends ValidationOptions {
  table: string;
  column?: string;
}

export function Exists(validationOptions?: ExistsOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'exists',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const column = validationOptions.column ?? args.property;

          const exists = await getConnection()
            .createQueryBuilder()
            .select('table')
            .from(validationOptions.table, 'table')
            .where(`table.${column} = :value`, {
              value: value,
            })
            .getOne();

          return exists !== undefined;
        },
        defaultMessage(): string {
          return 'Selected $property is invalid';
        },
      },
    });
  };
}
