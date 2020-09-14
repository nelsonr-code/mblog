import { BaseError } from "../../../domain-model/DomainErrors";

export class InvalidPasswordError extends BaseError {
  constructor() {
    super({
      message: "INVALID_PASSWORD",
      code: 401
    });
  }
}