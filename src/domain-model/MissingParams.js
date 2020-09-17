import { BaseError } from "./DomainErrors";

export class MissingParams extends BaseError {

  constructor(params) {
    super({
      message: 'MISSING_PARAMS',
      details: {
        params
      }
    })
  }
}