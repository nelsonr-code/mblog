import { Router } from 'express';
import { TestingController } from '../../controllers/testing';

const TestRouter = Router();

const testingController = new TestingController();

TestRouter.route('/echotest').get((req, res) => testingController.execute(req, res));

export default TestRouter;