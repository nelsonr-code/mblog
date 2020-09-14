export class FacebookTokenUpdateFailed extends BaseError {
  constructor() {
    super({
      message: 'FACEBOOK_TOKEN_UPDATE_FAILED'
    });
  }
}