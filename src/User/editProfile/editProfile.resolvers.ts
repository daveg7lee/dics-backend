import * as jwt from 'jsonwebtoken';
import client from '../../client';
import { protectedResolver } from '../../utils';

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { email, bio, avatar, oldPassword, newPassword },
        { loggedInUser }
      ) => {
        let password;
        if (email && loggedInUser.email !== email) {
          const emailExists = await client.user.findUnique({
            where: {
              email,
            },
          });
          if (emailExists) {
            throw Error('This Email already have account');
          }
        }
        if (oldPassword) {
          const encryptedPassword: string = loggedInUser.password;
          const decorderPassword = jwt.verify(
            encryptedPassword,
            process.env.JWT_SECRET
          );
          if (decorderPassword.password !== oldPassword) {
            throw Error('Wrong Password');
          } else {
            password = jwt.sign(
              { password: newPassword },
              process.env.JWT_SECRET
            );
          }
        }
        try {
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              email,
              bio,
              avatar,
              password,
            },
          });
          return true;
        } catch (e) {
          throw Error(e.message);
        }
      }
    ),
  },
};
