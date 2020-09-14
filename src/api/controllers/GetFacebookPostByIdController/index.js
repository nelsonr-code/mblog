import { BaseController } from "../BaseController";
import { GetFacebookPostById } from "../../../modules/Facebook/useCases/GetFacebookPostById";

export class GetFacebookPostByIdController extends BaseController {


  constructor() {
    super();
    this.getFacebookPostById = new GetFacebookPostById();
  }

  async executeImpl(req, res) {
    const { userId, postId }  = req.params;

    const data = await this.getFacebookPostById.executeImpl({ userId, postId });

    return this.ok(res, data);

  }
}