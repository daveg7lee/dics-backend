import * as jwt from 'jsonwebtoken';
import client from '../../client';
import { deleteInS3, protectedResolver, uploadToS3 } from '../../utils';

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { email, bio, avatar, oldPassword, newPassword },
        { loggedInUser }
      ) => {
        let password;
        let avatarUrl = null;
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
        if (avatar) {
          avatarUrl = await uploadToS3(avatar, loggedInUser.id, 'avatars');
          loggedInUser.avatar && (await deleteInS3(loggedInUser.avatar));
        }
        try {
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              email,
              bio,
              ...(avatarUrl && { avatar: avatarUrl }),
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
