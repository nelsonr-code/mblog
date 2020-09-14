import { BaseController } from "../BaseController";
import { FindById } from "../../../modules/Testing/useCases/findById";

export class TestingController extends BaseController {

  constructor() {
    super();
    this.testingUseCase = new FindById();
  }

  async executeImpl(req, res) {

    const data = await this.testingUseCase.execute(1,2,3);
    return this.ok(res, { message: 'todo fine todo good ', data });
  }
}