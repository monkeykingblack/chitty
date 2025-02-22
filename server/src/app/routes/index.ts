import { Router } from 'express';

import authRouter from './auth.routes';
import messagesRouter from './messages.routes';
import usersRouter from './users.routes';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/messages', messagesRouter);

export default router;
