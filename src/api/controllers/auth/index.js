import { BaseController } from "../BaseController";
import { AuthenticationByEmailUseCase } from "../../../modules/Users/useCases/AuthenticationByEmail";
import { InvalidPasswordError } from "./InvalidPasswordError";
import { JWTService } from "../../../services/Security/JWTService";

export class AuthController extends BaseController {

  constructor() {
    super();
    this.authenticate = new AuthenticationByEmailUseCase();
    this.jwtService = new JWTService();
  }

  async executeImpl(req, res) {
    
    const { email, password } = req.body;
    const { isValidPassword=false, user=null } = await this.authenticate.execute(email, password);

    if(!isValidPassword) throw new InvalidPasswordError();

    const token = this.jwtService.generateToken({ userId: user._id });

    this.ok(res, {
      message: 'password_validation_success',
      token,
      userData: user.getSessionData()
    });
  }
}