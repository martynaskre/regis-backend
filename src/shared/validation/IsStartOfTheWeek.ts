import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsStartOfTheWeek(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: Date) {
          return value.getDay() === 1; // 1 is retarded way english people determine monday
        },
        defaultMessage() {
          return '$property must be start of the week';
        },
      },
    });
  };
}
