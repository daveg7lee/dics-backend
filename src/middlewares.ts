import * as jwt from 'jsonwebtoken';
import { prisma } from '../generated/prisma-client';

export const isAuthenticated = (request) => {
  if (!request.user) {
    throw Error('You need to log in to perform this action');
  }
  return;
};
