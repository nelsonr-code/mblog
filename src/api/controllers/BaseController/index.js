import logger from "../../../infraestructure/logger";
import { BaseError } from "../../../domain-model/DomainErrors";

export class BaseController {
  constructor() {
    this._logger = logger;
  }

  logger() {
    return this._logger;
  }

  executeImpl(req, res) {
    throw new Error("Method 'executeImpl()' must be implemented.");
  }

  async execute(req, res) {
    try {
      await this.executeImpl(req, res);
    } catch (err) {
      this.logger().error("[Base controller]: Caught controller error", err);
      if(err instanceof BaseError) {
        return this.clientError(res, err);
      }
      this.fail(res, err);
    }
  }

  static jsonResponse(res, code, json) {
    return res.status(code).json(json);
  }

  ok(res, dto) {
    if (!!dto) {
      res.type("application/json");
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  clientError(res, err) {
    if(err instanceof BaseError){
      return BaseController.jsonResponse(res, err.code, err);
    }
    return BaseController.jsonResponse(res, 400, { message: err.toString() });
  }

  unauthorized(res, message = "UNAUTHORIZED") {
    return BaseController.jsonResponse(res, 401, { message });
  }

  todo(res) {
    return BaseController.jsonResponse(res, 400, { message: "TODO" });
  }

  fail(res, error) {
    this.logger().error("request failed", error.toString());
    if(error instanceof BaseError) {
      return res.status(500).json(error);
    } else {
      return res.status(500).json({
        message: error.toString(),
      });
    }
  }
}
