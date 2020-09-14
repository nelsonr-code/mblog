import { BaseController } from "../BaseController";
import { GetInstagramPosts } from "../../../modules/Instagram/useCases/GetInstagramPosts";

export class GetInstagramPostsController extends BaseController {

    constructor() {
        super();
        this.getInstagramPosts = new GetInstagramPosts();
    }

    
}