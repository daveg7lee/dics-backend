import client from '../../client';

export default {
  Query: {
    searchScore: async (_, { term }) =>
      client.score.findMany({
        where: { uploader: term },
        include: { user: true },
      }),
  },
};
