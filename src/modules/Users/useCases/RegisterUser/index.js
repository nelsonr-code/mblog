import { UserRepository } from "../../../../infraestructure/mongoose/repositories/userRepository";
import { UserCreationError } from "./RegistrationErrors";

const { BaseUseCase } = require("../../../BaseUseCase");

export class RegisterUserUseCase extends BaseUseCase {
  constructor() {
    super();
    this.userRepository = new UserRepository();
  }

  async executeImpl(userData) {
    const UserModel = this.userRepository.model();
    const user = UserModel({
      email: userData["email"],
      profile: {
        firstName: userData["name"],
        lastName: userData["lastname"],
      },
      password: userData["password"],
      active: true,
      roles: ['user']
    });

    try {
      const userDB = await user.save();
      return { message: "ok", data: userDB };
    } catch (err) {
      this.logger().error("error in user creation", {
        userData,
        err: err.toString(),
      });
      throw new UserCreationError({
        message: `user_creation_failed`,
        details: err.toString()
      });
    }
  }
}
