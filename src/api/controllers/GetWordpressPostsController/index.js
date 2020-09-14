import { GetWordpresPosts } from "../../../modules/Wordpress/useCases/GetWordpressPosts";

const { BaseController } = require("../BaseController")

export class GetWordpressPostsController extends BaseController {


  constructor() {
    super();
    this.getWordpresssPosts = new GetWordpresPosts();
  }

  async executeImpl(req, res) {
    const { userId }  = req.params;

    const data = await this.getWordpresssPosts.executeImpl({ userId });

    return this.ok(res, data);

  }
}