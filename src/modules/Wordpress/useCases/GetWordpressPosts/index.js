import { UserRepository } from "../../../../infraestructure/mongoose/repositories/userRepository";
import { WordpressService } from "../../../../services/WordpressService";

const { BaseUseCase } = require("../../../BaseUseCase")

export class GetWordpresPosts extends BaseUseCase {

  constructor() {
    super();
    this.userRepository = new UserRepository();
    this.wordpressService = new WordpressService();
  }

  async executeImpl({ userId }) {

    const wordpressConfig = await this.userRepository.getSocialMediaConfiguration(userId, WordpressService.namespace);
    const posts = await this.wordpressService.getPosts(wordpressConfig.url);

    return posts;
  }
}