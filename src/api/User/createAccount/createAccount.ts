import { prisma } from '../../../../generated/prisma-client';
import * as jwt from 'jsonwebtoken';

export default {
  Mutation: {
    createAccount: async (_, args): Promise<boolean> => {
      const { username, email, bio = '', password, type, avatar } = args;
      const usernameExists: boolean = await prisma.$exists.user({
        username,
      });
      const emailExists: boolean = await prisma.$exists.user({ email });
      const encryptedPassword: string = jwt.sign(
        { password },
        process.env.JWT_SECRET
      );
      if (usernameExists) {
        throw Error('This username is already taken');
      } else if (emailExists) {
        throw Error('This Email already have account');
      }
      if (
        type === 'Student' ||
        type === 'Teacher' ||
        type === 'Parents' ||
        type === 'Admin'
      ) {
        await prisma.createUser({
          username,
          email,
          bio,
          password: encryptedPassword,
          type,
          avatar,
        });
        return true;
      }
    },
  },
};
