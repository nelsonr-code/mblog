import { BaseController } from "../BaseController";
import { InstagramService } from "../../../services/InstagramService";
import { UserRepository } from "../../../infraestructure/mongoose/repositories/userRepository";

export class InstagramCallbackController extends BaseController {

    constructor() {
        super();
        this.userRepository = new UserRepository();
        this.instagramService = new InstagramService();
    }

    async executeImpl(req, res) {
        try {
            console.log("Executing callback instagram controller...");
            const user = await this.userRepository.findById(req.params.userId);
            this.logger().info("User found", user.profile);
            let data = await this.instagramService.getAccessToken(req.query.code, user._id);
        
            await this.saveInstagramToken.executeImpl(user._id, data.access_token);
            
            return res.redirect(307, `${config.get('oauth2redirect')}/instagram/posts/`);      
                
        } catch (error) {
            this.logger().fatal('ERROR IN INSTAGRAM INTEGRATION');
            console.log('err', err);
            return res.redirect(307, `${config.get('oauth2redirect')}?error=true`);      
        }
    }
}