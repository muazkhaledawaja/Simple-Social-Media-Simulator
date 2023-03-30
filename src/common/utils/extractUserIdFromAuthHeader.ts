/* eslint-disable prettier/prettier */
import * as jwt from 'jsonwebtoken';

export function extractUserIdFromAuthHeader(authHeader: string): number {
    const token = authHeader.split(' ')[1]; // extract the token from the header
    const decodedToken = jwt.decode(token); // decode the token to get the payload
    const userId = decodedToken.sub; // extract the user id from the payload
    return Number(userId); // convert the user id to a number and return it
  }
  