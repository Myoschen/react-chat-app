import { NextFunction, Request, Response } from 'express';
import response from '../utils/responseUtil';
import User from '../models/user.model';
import JWT from '../utils/jwtUtil';

/**
 * Create a new user
 * @param req 
 * @param res 
 * @param next 
 */
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, email } = req.body;
  const user = new User({ username, password, email });
  try {
    await user.save();
    res.status(201).json(
      response.success(true, 'User create successfully', user)
    );
  } catch (error) {
    res.status(500).json(
      response.failure(false, 'User create failed', error, 500)
    );
  }
};

/**
 * Find user by user id
 * @param req 
 * @param res 
 * @param next 
 */
const findUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.userId;
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      res.status(404).json(
        response.failure(false, 'Not found user', null, 404)
      );
    }
    res.status(200).json(
      response.success(true, 'Find user successfully', user)
    );
  } catch(error) {
    res.status(500).json(
      response.failure(false, 'Not found user', error, 500)
    );
  }
};

/**
 * User login
 * @param req 
 * @param res 
 * @param next 
 */
const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = JWT.createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 86400 * 1000 });
    res.status(201).json(
      response.success(true, 'Login successfully', null)
    );
  } catch (error) {
    res.status(400).json(
      response.failure(false, 'Login failed', null, 400)
    );
  }
}

export default { createUser, findUser, login };