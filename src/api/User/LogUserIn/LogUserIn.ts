import { prisma, User } from '../../../../generated/prisma-client';
import * as jwt from 'jsonwebtoken';
import { generateToken } from '../../../utils';

export default {
  Mutation: {
    LogUserIn: async (_, args) => {
      const { username, password } = args;
      const user: User = await prisma.user({ username });
      if (user) {
        const encryptedPassword: string = user.password;
        const decorderPassword = jwt.verify(
          encryptedPassword,
          process.env.JWT_SECRET
        );
        if (decorderPassword.password === password) {
          return generateToken(user.id);
        } else {
          throw Error('Wrong Password');
        }
      } else {
        throw Error('User Not Found, Sign Up First');
      }
    },
  },
};
