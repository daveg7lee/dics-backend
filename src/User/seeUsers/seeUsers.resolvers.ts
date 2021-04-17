import client from '../../client';

export default {
  Query: {
    seeUsers: async () => client.user.findMany({}),
  },
};
