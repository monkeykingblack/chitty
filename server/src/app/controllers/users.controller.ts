import { Request, Response } from 'express';

import { ChatRepository } from '../repositories/chat.repository';
import { UsersService } from '../services/users.service';

export const handleGetOnlineUsers = (req: Request, res: Response) => {
  return res.json(UsersService.getOnlineUsers());
};

export const handleGetUserInfo = (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = ChatRepository.getUsers().find((u) => u.id == userId);

  if (!user) {
    return res.status(404).end();
  }

  return res.json(user);
};
