import { BaseError } from "../../../domain-model/DomainErrors";

export class InstagramTokenNotFound extends BaseError {

  constructor() {
    super({
      message: 'FACEBOOK_TOKEN_NOT_FOUND'
    });
  }
}