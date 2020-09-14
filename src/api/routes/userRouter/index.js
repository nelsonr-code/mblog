import { Router } from 'express';
import { AuthController } from '../../controllers/auth';
import { UserRegisterController } from '../../controllers/users/UserRegister';
import { FindUserByIdController } from '../../controllers/users/FindUserByIdController';
import { GetFacebookPostsController } from '../../controllers/GetFacebookPostsController';
import { GetFacebookPostByIdController } from '../../controllers/GetFacebookPostByIdController';

const userRouter = Router();

const authController = new AuthController();
const userRegisterController = new UserRegisterController();
const findUserByIdController = new FindUserByIdController();
const getFacebookPostsControllers = new GetFacebookPostsController();
const getFacebookPostByIdController = new GetFacebookPostByIdController();

userRouter.route('/auth').post((req, res) => authController.execute(req, res));
userRouter.route('/').post((req, res) => userRegisterController.execute(req, res));

userRouter.route('/:id').get((req, res) => findUserByIdController.execute(req, res));

userRouter.route('/:userId/facebook/posts/').get((req, res) => getFacebookPostsControllers.execute(req, res));
userRouter.route('/:userId/facebook/posts/:postId').get((req, res) => getFacebookPostByIdController.execute(req, res));

export { userRouter };