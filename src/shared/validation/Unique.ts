import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { getConnection } from 'typeorm';

interface Where {
  column: string;
  value?: string;
  formField?: string;
}

interface UniqueOptions extends ValidationOptions {
  table: string;
  column?: string;
  wheres?: Where[];
}

export function Unique(validationOptions: UniqueOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'unique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const column = validationOptions.column ?? args.property;

          let query = getConnection()
            .createQueryBuilder()
            .select('table')
            .from(validationOptions.table, 'table')
            .where(`table.${column} = :value`, {
              value,
            });

          if (validationOptions.wheres) {
            for (const where of validationOptions.wheres) {
              const whereValue =
                where.value ?? (args.object as any)[where.formField];

              query = query.andWhere(
                `table.${where.column} = :${where.column}`,
                {
                  [where.column]: whereValue,
                },
              );
            }
          }

          const exists = await query.getOne();

          return exists == undefined;
        },
        defaultMessage(): string {
          return '$property should be unique';
        },
      },
    });
  };
}
