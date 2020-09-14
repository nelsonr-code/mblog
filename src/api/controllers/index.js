import { Router } from 'express';
import * as main from './main/index.router';

// Define router
const router = Router();


// controllers
router.use('/main', main.default);


export default router;