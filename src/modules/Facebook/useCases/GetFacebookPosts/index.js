import { UserRepository } from "../../../../infraestructure/mongoose/repositories/userRepository";
import { FacebookService } from "../../../../services/FacebookService";
import { BaseUseCase } from "../../../BaseUseCase";


export class GetFacebookPosts extends BaseUseCase {

  constructor() {
    super();
    this.userRepository = new UserRepository();
    this.facebookService = new FacebookService();
  }

  async executeImpl({ userId }) {

    const facebookConfig = await this.userRepository.getSocialMediaConfiguration(userId, FacebookService.namespace);
    const posts = await this.facebookService.getPosts(facebookConfig.accessToken);

    return posts;
  }
}