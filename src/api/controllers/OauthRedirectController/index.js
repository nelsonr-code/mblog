import { BaseController } from "../BaseController";
import { FacebookService } from "../../../services/FacebookService";
import { BaseError } from "../../../domain-model/DomainErrors";
import { FindUserById } from "../../../modules/Users/useCases/FindUserById";

export class OauthRedirectController extends BaseController {

  constructor() {
    super();
    this.facebookService = new FacebookService();
    this.findUserById = new FindUserById();
  }

  async executeImpl(req, res) {
    console.log("los params", req.query);
    const { userId } = req.query;
    if(!userId) throw new BaseError({message: 'USERID_IS_REQUIRED'})
    const user = await this.findUserById.execute(userId);
    let url = this.facebookService.getOauth2Url(user.email, userId);
    return res.redirect(308, url);
  }
}