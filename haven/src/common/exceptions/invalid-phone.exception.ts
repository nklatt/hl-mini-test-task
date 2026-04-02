import { BadRequestException } from "@nestjs/common";

export class InvalidPhoneException extends BadRequestException {
  constructor(message?: string) {
    super(message || "Invalid phone number");
  }
}
