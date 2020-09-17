import { BaseController } from "../BaseController";
import { FacebookService } from "../../../services/FacebookService";
import { CodeNotProvided } from "./CodeNotProvided";
import { UserRepository } from "../../../infraestructure/mongoose/repositories/userRepository";
import config from 'config';
import { UserNotFound } from "../../../domain-model/UserNotFound";
import { SaveFacebookToken } from "../../../modules/Users/useCases/SaveFacebookToken";
import { FacebookTokenNotFound } from "./FacebookTokenNotFound";

export class FacebookCallbackController extends BaseController {

  constructor() {
    super();
    this.facebookService = new FacebookService();
    this.userRepository = new UserRepository();
    this.saveFacebookToken = new SaveFacebookToken();
  }

  async executeImpl(req, res) {

    try {
      console.log("el fucking params del callback", req.params);
      if(!req.query.code) throw new CodeNotProvided();
  
      const user = await this.userRepository.findById(JSON.parse(req.query.state).user);
      if(!user) throw new UserNotFound();

      this.logger().info("User found", user.profile)
  
      let data = await this.facebookService.getAccessToken(req.query.code, user._id);
      if(!data.access_token) throw new FacebookTokenNotFound();
  
      await this.saveFacebookToken.executeImpl(user._id, data.access_token);
      
      return res.redirect(307, `${config.get('oauth2redirect')}/facebook/posts/`);
      
    } catch (err) {
      this.logger().fatal('ERROR IN FACEBOOK INTEGRATION');
      console.log('err', err);
      return res.redirect(307, `${config.get('oauth2redirect')}?error=true`);
    }

  }
}