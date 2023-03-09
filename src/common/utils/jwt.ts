/* eslint-disable prettier/prettier */
import * as jwt from 'jsonwebtoken';
import { SYSTEM } from '../constants';

export const verifyToken = (token, secret) =>
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return false;
    }
    return decode;
  });

export const generateToken = (username: string) => {
  return jwt.sign({ username }, SYSTEM.SECRET, {
    expiresIn: '10h',
  });
};
