import logger from "./logger";
import encoding from "./encoding";

export default (app) => {
  // setting up middlewares
  logger(app);
  encoding(app);
  app.use((req, res, next) => {
    console.log("method", req.method);
    console.log("url", req.url);
    console.log("data", req.method === "GET" ? req.query : req.body);
    next();
  });
};
