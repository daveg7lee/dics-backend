import * as jwt from 'jsonwebtoken';
import client from '../../client';

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, bio = '', password, type, avatar }
    ) => {
      const usernameExists = await client.user.findUnique({
        where: {
          username,
        },
      });

      if (usernameExists) {
        throw Error('This username is already taken');
      }

      const encryptedPassword: string = jwt.sign(
        { password },
        process.env.JWT_SECRET
      );

      await client.user.create({
        data: {
          username,
          email,
          bio,
          password: encryptedPassword,
          type,
          avatar,
        },
      });
      return true;
    },
  },
};
