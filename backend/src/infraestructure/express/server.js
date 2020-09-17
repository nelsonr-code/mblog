import express from "express";
import DomainErrors from "../../domain-model/DomainErrors";
import middlewares from "./middlewares";
import config from "config";
import logger from "../logger";
import Routes from "../../api/routes";

class Server {
  static appPort = process.env.PORT || config.get("port");

  constructor() {
    this._app = null;
    this._server = null;
  }

  init() {
    this._app = express();
  }

  app() {
    return this._app;
  }
  server() {
    return this._server;
  }

  setMiddlewares() {
    if (!this.app()) {
      throw DomainErrors.Fatal({
        message: "Server is not initialized",
        field: "server",
      });
    }

    middlewares(this.app());
  }

  start() {
    this.init();
    this.setMiddlewares();
    this.setRoutes('/api/v1', Routes);
    this.setStaticRoutes();

    this._server = this._app.listen(Server.appPort, () => {
      const { port, address } = this.server().address();
      logger.info(
        `[RestApiApp] STARTING AT PORT [${port}] ADDRESS [${address}]`
      );
    });
  }

  setRoutes(baseUrl, router) {

    this.app().use(baseUrl, router);
  }

  setStaticRoutes() {
    this.app().use('/', express.static(__dirname + '../../../../build-front'))
    this.app().use('/*',express.static(__dirname + '../../../../build-front'))
  }
}

export default new Server();
