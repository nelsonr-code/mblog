import { Router } from 'express';
import { GetWordpressTokenController } from '../../controllers/GetWordpressTokenController';
import { SaveWordpressTokenController } from '../../controllers/SaveWordpressTokenController';
import { GetWordpressPostsController } from '../../controllers/GetWordpressPostsController';
import { PostToWordpressController } from '../../controllers/PostToWordpressController';
const wordPressRouter = Router();

const getWordpressTokenController = new GetWordpressTokenController();
const saveWordpressTokenController = new SaveWordpressTokenController();
const getWordpressPostsController = new GetWordpressPostsController();
const postToWordpressController = new PostToWordpressController();

wordPressRouter.route('/check-blog-credentials').post((req, res) => getWordpressTokenController.execute(req, res));
wordPressRouter.route('/update-blog-credentials').put((req, res) => saveWordpressTokenController.execute(req, res));


wordPressRouter.route('/posts/:userId')
  .post((req, res) => postToWordpressController.execute(req, res))
  .get((req, res) => getWordpressPostsController.execute(req, res));

export { wordPressRouter };