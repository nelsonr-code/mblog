export class PasswordValidationResult {

  constructor(isValidPassword) {
    this._isValidPassword = isValidPassword;
  }

  isValidPassword() { return this._isValidPassword; }
}