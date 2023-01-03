import { Router } from 'express';
import UserRouter from './user.route';

const router = Router();

router.use( UserRouter );

export default router;
