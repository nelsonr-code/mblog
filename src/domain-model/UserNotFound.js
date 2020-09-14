import { BaseError } from "./DomainErrors";

export class UserNotFound extends BaseError {

  constructor(userData) {
    super({
      message: 'USER_NOT_FOUND',
      details: {
        userData
      }
    })
  }
}