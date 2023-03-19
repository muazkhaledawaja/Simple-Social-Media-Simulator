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

export const generateToken = (username: string,id:number) => {
  return jwt.sign({ username ,id }, SYSTEM.SECRET, {
    expiresIn: '10h',
  });
};
