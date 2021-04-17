import * as jwt from 'jsonwebtoken';
import client from '../../client';
import { generateToken } from '../../utils';

export default {
  Mutation: {
    LogUserIn: async (_, args) => {
      const { username, password } = args;
      const user = await client.user.findUnique({
        where: {
          username,
        },
      });
      if (!user) {
        throw Error('User Not Found, Sign Up First');
      }
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
    },
  },
};
