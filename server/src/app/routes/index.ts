import { Router } from 'express';

import authRouter from './auth.routes';
import messagesRouter from './messages.routes';
import usersRouter from './users.routes';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/messages', messagesRouter);
router.use('/heath', (req, res) => {
  res.status(200).send('Ok');
});

export default router;
