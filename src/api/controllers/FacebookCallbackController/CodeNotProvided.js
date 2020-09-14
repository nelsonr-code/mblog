import { BaseError } from "../../../domain-model/DomainErrors";

export class CodeNotProvided extends BaseError {
  
  constructor() {
    super({message: 'CODE_NOT_PROVIDED'});
  }
}