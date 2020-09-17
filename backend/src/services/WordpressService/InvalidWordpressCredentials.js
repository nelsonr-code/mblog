import { BaseError } from "../../domain-model/DomainErrors";

export class InvalidWordpressCredentials extends BaseError {

  constructor() {
    super({
      message: 'INVALID_WORDPRESS_CREDENTIALS'
    });
  }
};