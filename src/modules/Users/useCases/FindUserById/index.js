import { BaseUseCase } from "../../../BaseUseCase";
import { UserRepository } from "../../../../infraestructure/mongoose/repositories/userRepository";
import { UserNotFound } from "../../../../domain-model/UserNotFound";

export class FindUserById extends BaseUseCase {
  constructor() {
    super();
    this.userRepository = new UserRepository();
  }

  async executeImpl(id) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFound(id);
    return user;
  }
}
