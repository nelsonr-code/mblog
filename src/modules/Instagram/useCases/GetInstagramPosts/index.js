import { UserRepository } from "../../../../infraestructure/mongoose/repositories/userRepository";
import { InstagramService } from "../../../../services/InstagramService";
import { BaseUseCase } from "../../../BaseUseCase";

export class GetInstagramPosts extends BaseUseCase {

    constructor() {
      super();
      this.userRepository = new UserRepository();
      this.instagramService = new InstagramService();
    }
  
    async executeImpl({ userId }) {
    
      const instagramConfig = await this.userRepository.getSocialMediaConfiguration(userId);
      const posts = await this.instagramService.getPosts();
      return posts;
    }
}