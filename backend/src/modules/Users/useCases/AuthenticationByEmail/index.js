import { BaseUseCase } from "../../../BaseUseCase";
import { UserRepository } from "../../../../infraestructure/mongoose/repositories/userRepository";
import { UseCaseError } from "../../../../domain-model/DomainErrors";
import { UseCaseSuccess } from "../../../../domain-model/UseCaseSuccess";
import { PasswordValidationResult } from "./PasswordValidationResult";

export class AuthenticationByEmailUseCase extends BaseUseCase {

  constructor() {
    super();
    this.userRepository = new UserRepository();
  }

  async executeImpl(email, password) {

    const user = await this.userRepository.getUserByEmail(email);

    if(!user) {
      this.logger().error('user not found', { email });
      throw new UseCaseError({ message: 'User not found', field: 'email' });
    }

    const isValidPassword = user.comparePassword(password);

    this.logger().info('password validation result', new PasswordValidationResult(isValidPassword));

    return { isValidPassword, user };
  }
}