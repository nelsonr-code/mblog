import { Router } from 'express';
import TestRouter from './testRouter';
import { userRouter } from './userRouter';
import { wordPressRouter } from './wordpressRouter';
import { oauth2Router } from './oauth2Router';

const Routes = Router();

Routes.use('/test', TestRouter);
Routes.use('/user', userRouter);
Routes.use('/wordpress', wordPressRouter);
Routes.use('/oauth2', oauth2Router);

export default Routes;