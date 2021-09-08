import client from '../../client';

export default {
  Query: {
    searchScore: async (_, { term }) => {
      console.log(term);
      return client.score.findMany({
        where: { uploader: { contains: term }, type: 'Demerit' },
        include: { user: true },
      });
    },
  },
};
