export class BaseError extends Error {
  constructor({message, field, parent, details, code=400} = {}) {
      super();

      if (!message) /* c8 ignore next */ throw new Error('"message" is required');

      this.message = message;
      this.field   = field;
      this.parent  = parent;
      this.details = details;
      this.code = code;
  }
}

export class WrongId extends BaseError { }
export class NotUnique extends BaseError { }
export class Fatal extends BaseError { }
export class InactiveObject extends BaseError { }
export class WrongParameterValue extends BaseError { }
export class UseCaseError extends BaseError { }

export default {
  BaseError,
  NotUnique,
  WrongId,
  InactiveObject,
  WrongParameterValue,
  Fatal,
  UseCaseError
};