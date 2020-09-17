import winston, { createLogger } from "winston";
import { MongoDB } from "winston-mongodb";
import config from "config";
import { WrongParameterValue } from "../domain-model/DomainErrors";

const defaultWinstonFormat = winston.format.combine(
  winston.format.label({
    label: "default",
  }),
  winston.format.json(),
  winston.format.prettyPrint(),
  winston.format.timestamp()
);

class WinstonLogger {
  static names = {
    persistent: Symbol.for("persistent"),
    default: Symbol.for("default"),
  };

  static loggers = {
    [WinstonLogger.names.persistent]: createLogger({
      format: defaultWinstonFormat,
      transports: [
        new winston.transports.Console(),
        new MongoDB({
          // para usar la de atlas, setea la variable de entorno NODE_ENV=developer
          db: config.get("database.masterblog"),
          ////////////////////////////////////////////////////////////////////////
          options: { useUnifiedTopology: true,
            useNewUrlParser: true,
          },
          collection: "logs",
          decolorize: true,
          capped: true,
          cappedSize: 5 * 1024,
        }),
      ],
    }),
    [WinstonLogger.names.default]: createLogger({
      format: defaultWinstonFormat,
      transports: [new winston.transports.Console()],
    }),
  };

  constructor() {
    this._logger = WinstonLogger.loggers[WinstonLogger.names.persistent];
  }

  setLogger(name) {
    if (!["persistent", "default"].includes(name))
      throw new WrongParameterValue({
        message: "[setLogger] name must be persistent or default",
        field: "name",
      });

    this._logger = WinstonLogger.loggers[Symbol.for(name)];
  }

  logger() {
    return this._logger;
  }

  fatal(message, data) {
    return this.logger().error({message, data});
  }
  error(message, data) {
    return this.logger().error({message, data});
  }

  warn(message, data) {
    return this.logger().warn({message, data});
  }

  info(message, data) {
    return this.logger().info({ message, data });
  }

  debug(message, data) {
    return this.logger().debug({message, data});
  }

  trace(message, data) {
    return this.logger().debug({message, data});
  }
}

export default new WinstonLogger();
