import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { getConnection } from 'typeorm';

interface UniqueOptions extends ValidationOptions {
  table: string;
  column?: string;
}

export function Unique(validationOptions?: UniqueOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'unique',
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

          return exists == undefined;
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          return '$property should be unique';
        }
      },
    });
  };
}
