import { BaseUseCase } from "../../../BaseUseCase";
import { UserRepository } from "../../../../infraestructure/mongoose/repositories/userRepository";
import { UserNotFound } from "../../../../domain-model/UserNotFound";
import { FacebookService } from "../../../../services/FacebookService";

export class SaveFacebookToken extends BaseUseCase {

  constructor() {
    super();
    this.userRepository = new UserRepository();
  }

  async executeImpl(userId, token) {
    const user = await this.userRepository.findById(userId);
    if(!user) throw new UserNotFound();

    try {
      await user.updateAccessToken(token, FacebookService.namespace);
    } catch (err) {
      throw new FacebookTokenUpdateFailed();
    }
  }
}