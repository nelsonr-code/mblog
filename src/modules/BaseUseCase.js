import logger from "../infraestructure/logger";
import { UseCaseError } from "../domain-model/DomainErrors";
import { UseCaseSuccess } from "../domain-model/UseCaseSuccess";

export class BaseUseCase {
  constructor() {
    this._logger = logger;
  }

  logger() {
    return this._logger;
  }

  async execute(...args) {
    try {
      return await this.executeImpl.apply(this, args);
    } catch (err) {
      this.logger().error("[Base use case]: use case error");
      throw err;
    }
  }

  executeImpl() {
    throw new Error("Method 'executeImpl()' must be implemented.");
  }
}
