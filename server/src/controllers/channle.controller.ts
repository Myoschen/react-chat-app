import { NextFunction, Request, Response } from 'express';
import response from '../utils/responseUtil';
import Channel from '../models/channel.model';
import Server from '../models/server.model';

/**
 * Create a new channel
 * @param req 
 * @param res 
 * @param next 
 */
const createChannel = async (req: Request, res: Response, next: NextFunction) => {
  const { serverId, channelName } = req.body;
  const channel = new Channel({ name: channelName });
  try {
    await channel.save();
    await Server.updateOne({ _id: serverId }, { $push: { "channels": channel._id }});
    res.status(201).json(
      response.success(true, 'Channel create successfully', channel)
    );
  } catch (error) {
    res.status(500).json(
      response.failure(false, 'Channel create failed', error, 500)
    );
  }
};

export default { createChannel };