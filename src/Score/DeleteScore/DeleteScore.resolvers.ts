import client from '../../client';

export default {
  Mutation: {
    deleteScore: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id } = args;
      const scoreExists = client.score.findUnique({ where: { id } });
      if (user.type === 'Admin' && scoreExists) {
        await client.score.delete({ where: { id } });
        return true;
      } else {
        throw Error("You Can't");
      }
    },
  },
};
