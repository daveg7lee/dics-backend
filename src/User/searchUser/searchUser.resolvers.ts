import client from '../../client';

export default {
  Query: {
    searchUser: async (_, { term }) => {
      if (term === '') {
        return [];
      } else {
        return client.user.findMany({
          where: { username: { contains: term } },
        });
      }
    },
  },
};
