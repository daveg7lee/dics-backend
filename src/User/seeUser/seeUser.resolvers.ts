import client from '../../client';

export default {
  Query: {
    seeUser: async (_, { username }) =>
      client.user.findUnique({ where: { username } }),
  },
};
