import { Router } from 'express';

import {
  handleGetOnlineUsers,
  handleGetUserInfo,
} from '../controllers/users.controller';

const usersRouter: Router = Router();

usersRouter.get('/online', handleGetOnlineUsers);

usersRouter.get('/:userId', handleGetUserInfo);

export default usersRouter;
