import client from '../../client';

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const {
        user: { id },
      } = request;
      return await client.user.findUnique({
        where: {
          id,
        },
      });
    },
  },
};
