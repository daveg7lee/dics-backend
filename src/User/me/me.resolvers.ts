import client from '../../client';
import { protectedResolver } from '../../utils';

export default {
  Query: {
    me: protectedResolver(async (_, __, { loggedInUser }) => {
      return await client.user.findUnique({
        where: {
          id: loggedInUser.id,
        },
      });
    }),
  },
};
