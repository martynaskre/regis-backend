import { registerDecorator, ValidationOptions } from 'class-validator';
import * as dayjs from 'dayjs';

export function IsNotPastWeek(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: Date) {
          const currentWeek = dayjs()
            .isoWeekday(0)
            .hour(0)
            .minute(0)
            .millisecond(0)
            .toDate();

          return value.getTime() >= currentWeek.getTime();
        },
        defaultMessage() {
          return '$property must not be past week';
        },
      },
    });
  };
}
