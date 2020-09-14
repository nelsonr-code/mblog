import { BaseUseCase } from "../../../BaseUseCase";
import { WordpressService } from "../../../../services/WordpressService";
import { UserRepository } from "../../../../infraestructure/mongoose/repositories/userRepository";
import { InvalidWordpressCredentials } from "../../../../services/WordpressService/InvalidWordpressCredentials";
import { UseCaseError } from "../../../../domain-model/DomainErrors";
import { UserNotFound } from "../../../../domain-model/UserNotFound";

export class SaveWordpressToken extends BaseUseCase {

  constructor() {
    super();
    this.wordpressService = new WordpressService();
    this.userRepository = new UserRepository();
  }

  async executeImpl({userId, blogUrl, blogkey}) {
    const user = await this.userRepository.findById(userId);
    if(!user) throw new UserNotFound(userId);

    try {
      const token = await this.wordpressService.getAccessToken(blogUrl, blogkey);
      this.logger().info('token', token);
      await user.updateAccessToken(token, WordpressService.namespace, blogUrl);

    } catch (err) {
      if(err instanceof InvalidWordpressCredentials) {
        throw err
      } else {
        throw new UseCaseError({ message: 'UNKNOWN ERROR', details: err.toString()});
      }
    }
  }
}