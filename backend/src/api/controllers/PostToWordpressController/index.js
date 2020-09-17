import { BaseController } from "../BaseController";
import { MissingParams } from "../../../domain-model/MissingParams";
import { FindUserById } from "../../../modules/Users/useCases/FindUserById";
import { PostToBlog } from "../../../modules/Wordpress/useCases/PostToBlog";
import { WordpressPostConfigMap } from "./WordpressPostConfig";

export class PostToWordpressController extends BaseController {

  constructor() {
    super();
    this.postToWordpressBlog = new PostToBlog();
    this.findUserById = new FindUserById();
  }

  async executeImpl(req, res) {

    let { wordpressConfig } = req.body;
    let { userId } = req.params;

    if(!userId || !wordpressConfig) throw new MissingParams("userId or wordpressConfig");

    await this.findUserById.execute(userId);

    const postConfig = WordpressPostConfigMap.fromWebRequest(wordpressConfig);

    await this.postToWordpressBlog.executeImpl({ userId, postConfig });

    this.ok(res, "ok");

  }
}