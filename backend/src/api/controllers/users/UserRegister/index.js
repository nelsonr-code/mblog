import { BaseController } from "../../BaseController";
import { RegisterUserUseCase } from "../../../../modules/Users/useCases/RegisterUser";
import { UserCreationData } from "../../../../modules/Users/useCases/RegisterUser/UserCreationData";

export class UserRegisterController extends BaseController {
  constructor() {
    super();
    this.registerUser = new RegisterUserUseCase();
  }

  async executeImpl(req, res) {
    let userData = new UserCreationData(
      req.body["email"],
      req.body["name"],
      req.body["lastname"],
      req.body["password"]
    );

    try {
      const { message, data } = await this.registerUser.execute(userData);
      this.logger().info(message, data);
      this.ok(res, data);
    } catch (err) {
      this.clientError(res, err);
    }
  }
}
