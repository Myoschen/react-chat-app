import { NextFunction, Request, Response } from 'express';
import Message from '../models/message.model';

const findAllMessage = (req: Request, res: Response, next: NextFunction) => {
  res.send('123');
};

export default { findAllMessage };