import { BaseUseCase } from "../../../BaseUseCase";
import { WordpressService } from "../../../../services/WordpressService";

export class GetBlogAuthToken extends BaseUseCase {

  constructor() {
    super();
    this.wordPressService = new WordpressService();
  }

  async executeImpl({blogUrl, blogkey}) {
    const token = await this.wordPressService.getAccessToken(blogUrl, blogkey);
    return { message: 'ok', data: token };
  }
}