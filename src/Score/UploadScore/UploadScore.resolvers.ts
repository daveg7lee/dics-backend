import client from '../../client';
import { protectedResolver } from '../../utils';

export default {
  Mutation: {
    UploadScore: protectedResolver(
      async (
        _,
        { score, article, username, type, date, uploader }
      ): Promise<Boolean> => {
        const user = await client.user.findUnique({ where: { username } });
        if (!user) {
          throw Error('This user is not found');
        }
        try {
          await client.score.create({
            data: {
              score,
              article,
              type,
              user: { connect: { id: user.id } },
              date,
              uploader,
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
