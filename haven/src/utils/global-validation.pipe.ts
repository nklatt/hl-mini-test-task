import {
  type ArgumentMetadata,
  type PipeTransform,
  ValidationPipe,
} from "@nestjs/common";

export class GlobalValidationPipe implements PipeTransform {
  private readonly validationPipe: ValidationPipe;

  constructor() {
    this.validationPipe = new ValidationPipe({
      whitelist: true,
      transform: true,
    });
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    return this.validationPipe.transform(value, metadata);
  }
}
