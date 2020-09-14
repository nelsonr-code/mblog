import winstonLogger from "../../utils/winstonLogger";

let _LOGGER = winstonLogger;

export function setLogger(logger) {
  _LOGGER.setLogger(logger)
}

export default {
  fatal(message, data) {
    _LOGGER.fatal(message, data);
  },
  error(message, data) {
    _LOGGER.error(message, data);
  },
  warn(message, data) {
    _LOGGER.warn(message, data);
  },
  info(message, data) {
    _LOGGER.info(message, data);
  },
  debug(message, data) {
    _LOGGER.debug(message, data);
  },
  trace(message, data) {
    _LOGGER.trace(message, data);
  },
};
