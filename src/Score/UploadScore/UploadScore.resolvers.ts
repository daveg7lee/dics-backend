import client from '../../client';

export default {
  Mutation: {
    UploadScore: async (
      _,
      args,
      { request, isAuthenticated }
    ): Promise<Boolean> => {
      isAuthenticated(request);
      let { score, article, username, type, date, uploader } = args;
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
    },
  },
};
