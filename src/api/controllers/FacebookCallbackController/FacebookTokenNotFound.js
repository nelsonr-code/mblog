import { BaseError } from "../../../domain-model/DomainErrors";

export class FacebookTokenNotFound extends BaseError {

  constructor() {
    super({
      message: 'FACEBOOK_TOKEN_NOT_FOUND'
    });
  }
}