import client from '../../client';

export default {
  Query: {
    seeScores: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return client.score.findMany({
        where: {
          user,
        },
      });
    },
  },
};
