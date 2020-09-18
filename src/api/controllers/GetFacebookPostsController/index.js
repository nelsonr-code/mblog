import { BaseController } from "../BaseController";
import { GetFacebookPosts } from "../../../modules/Facebook/useCases/GetFacebookPosts";

export class GetFacebookPostsController extends BaseController {


  constructor() {
    super();
    this.getFacebookPosts = new GetFacebookPosts();
  }

  async executeImpl(req, res) {
    const { userId }  = req.params;
    const { since, until } = req.query;

    const data = await this.getFacebookPosts.executeImpl({ userId, since, until });

    return this.ok(res, data);

  }
}