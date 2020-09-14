import { BaseController } from "../BaseController";
import { GetBlogAuthToken } from "../../../modules/Wordpress/useCases/GetBlogAuthToken";

export class GetWordpressTokenController extends BaseController {
  constructor() {
    super();
    this.getBlogAuthToken = new GetBlogAuthToken();
  }

  async executeImpl(req, res) {
    const { blogUrl, blogkey } = req.body;

    try {
      const { message, data } = await this.getBlogAuthToken.execute({
        blogUrl,
        blogkey,
      });
      if (data) {
        return this.ok(res, message);
      }
      this.unauthorized(res, "UNAUTHORIZED");
    } catch (err) {
      this.clientError(res, err);
    }
  }
}
