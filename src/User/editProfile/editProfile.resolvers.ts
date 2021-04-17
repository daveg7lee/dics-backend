import * as jwt from 'jsonwebtoken';
import client from '../../client';

export default {
  Mutation: {
    editProfile: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { email, bio, avatar, oldPassword, newPassword } = args;
      const { user } = request;
      let password;
      if (email && user.email !== email) {
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
        const encryptedPassword: string = user.password;
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
          where: { id: user.id },
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
    },
  },
};
