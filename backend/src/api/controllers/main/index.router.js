import { Router } from 'express';
import actions from './index.controller';

// Define router
const router = Router();

router.route('/route')
    .get(actions.myFunction);


export default router;