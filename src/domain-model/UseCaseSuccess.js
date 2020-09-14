export class UseCaseSuccess {

  constructor(message, data) {
    this._message = message;
    this._data = data;
  }

  message() { return this._message; }
  data() { return this._data; }
}