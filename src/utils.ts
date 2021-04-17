import * as jwt from 'jsonwebtoken';
import client from './client';

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

export const protectedResolver = (ourResolver) => (
  root,
  args,
  context,
  info
) => {
  const { loggedInUser } = context;
  if (!loggedInUser) {
    const query = info.operation.operation === 'query';
    if (query) {
      return null;
    } else {
      return {
        success: false,
        error: 'Please log in',
      };
    }
  }
  return ourResolver(root, args, context, info);
};

export const getUser = async (token) => {
  try {
    // return null when token is undefined
    if (!token) {
      return null;
    }
    // get id from token
    const verifiedToken: any = await jwt.verify(token, process.env.JWT_SECRET);
    if ('id' in verifiedToken) {
      // get user by id
      const user = await client.user.findUnique({
        where: { id: verifiedToken['id'] },
      });
      // return user
      if (user) {
        return user;
      }
    }
    return null;
    // return null when error occur
  } catch {
    return null;
  }
};
