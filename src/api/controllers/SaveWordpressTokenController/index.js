import { BaseController } from "../BaseController";
import { SaveWordpressToken } from "../../../modules/Wordpress/useCases/SaveWordpressToken";

export class SaveWordpressTokenController extends BaseController {

  constructor() {
    super();
    this.saveWordpressToken = new SaveWordpressToken();
  }

  async executeImpl(req, res) {
    const { blogUrl, blogkey, userId } = req.body;

    try {
      await this.saveWordpressToken.executeImpl({blogUrl, blogkey, userId});
      this.ok(res, "ok");
    } catch (err) {
      this.clientError(res, err);
    }
  }
}