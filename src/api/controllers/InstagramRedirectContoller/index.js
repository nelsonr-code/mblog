import { BaseController } from "../BaseController";
import { InstagramService } from "../../../services/InstagramService";
import { BaseError } from "../../../domain-model/DomainErrors";
import { FindUserById } from "../../../modules/Users/useCases/FindUserById";

export class InstagramRedirectController extends BaseController {

    constructor() {
        super();
        this.instagramService = new InstagramService();
        this.findUserById = new FindUserById();
    }

    async executeImpl(req, res) {

        console.log(`'Executing instagram redirect...'`);
        console.log(`'Reciving: ${req.query}'`);
        const { userId } = req.query;
        console.log(`'req.query: ${req.query}'`);
        if(!userId) throw new BaseError({message: 'USERID_IS_REQUIRED'})

        const user = await this.findUserById.execute(`5f5bbf6c18114f4b4ac22d06`);
        
        let url = this.instagramService.getAuthorizeUser();
        console.log(`'URL: ${url}'`);

        return res.redirect(308, url);
    }
}