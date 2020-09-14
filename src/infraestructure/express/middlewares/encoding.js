import * as express from "express";
import bodyParser from 'body-parser';

export default (app) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.json());
};
