import { UserRepository } from "../../../../infraestructure/mongoose/repositories/userRepository";
import { FacebookService } from "../../../../services/FacebookService";
import { BaseUseCase } from "../../../BaseUseCase";


export class GetFacebookPostById extends BaseUseCase {

  constructor() {
    super();
    this.userRepository = new UserRepository();
    this.facebookService = new FacebookService();
  }

  async executeImpl({ userId, postId }) {

    const facebookConfig = await this.userRepository.getSocialMediaConfiguration(userId, FacebookService.namespace);
    const post = await this.facebookService.getPostById(facebookConfig.accessToken, postId);

    return post;
  }
}