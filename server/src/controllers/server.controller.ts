import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import response from '../utils/responseUtil';
import Server from '../models/server.model';

/**
 * Create a new server
 * @param req 
 * @param res 
 * @param next 
 */
 const createServer = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, serverName } = req.body;
  const server = new Server({ name: serverName, owner: new Types.ObjectId(userId) });
  try {
    await server.save();
    res.status(201).json(
      response.success(true, 'User create successfully', server)
    );
  } catch (error) {
    res.status(500).json(
      response.failure(false, 'User create failed', error, 500)
    );
  }
};

const findServer = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.serverId;
  try {
    const server = await Server.findById(id).populate('channels').exec();
    if (!server) {
      res.status(404).json(
        response.failure(false, 'Not found server', null, 404)
      );
    }
    res.status(200).json(
      response.success(true, 'Find server successfully', server)
    );
  } catch(error) {
    res.status(500).json(
      response.failure(false, 'Not found server', null, 500)
    );
  }
};

export default { createServer, findServer };