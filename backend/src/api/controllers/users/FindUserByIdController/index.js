import { BaseController } from "../../BaseController";
import { FindUserById } from "../../../../modules/Users/useCases/FindUserById";

export class FindUserByIdController extends BaseController {

  constructor() {
    super();
    this.findUserById = new FindUserById();
  }

  async executeImpl(req, res) {
    let { id } = req.params;
    try {
      const user = await this.findUserById.execute(id);
      this.ok(res, {user: user.toObject(), userData: user.getSessionData()});
    } catch (err) {
      this.fail(res, err);
    }
  }
}