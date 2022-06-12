import jwt from 'jsonwebtoken';
import config from '../config';

const createToken = (id: string) => {
  const token = jwt.sign(
    { id },
    config.jwtSecret, 
    { expiresIn: config.jwtExp }
  ); 
  return token;
}

export default { createToken };