import { registerDecorator, type ValidationOptions } from "class-validator";

export function IsId(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: "isId",
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `${propertyName} must be a positive integer number`,
        ...validationOptions,
      },
      validator: {
        validate(value: unknown) {
          return (
            typeof value === "number" && value > 0 && Number.isInteger(value)
          );
        },
      },
    });
  };
}
