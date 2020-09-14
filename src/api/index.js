import { Router } from "express";
import app from "../server";
import * as api from './controllers';

// Define routes
const router = Router();

// API main route
router.use('/v2', api.default);

router.get('/', (req, res) => {
    res.send('<h1>Principal</h1>')
});

export default router;