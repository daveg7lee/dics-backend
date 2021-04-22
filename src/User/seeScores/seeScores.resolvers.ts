import client from '../../client';
import { protectedResolver } from '../../utils';

export default {
  Query: {
    seeScores: protectedResolver(async (_, __, { loggedInUser }) => {
      return client.score.findMany({
        where: {
          userId: loggedInUser.id,
        },
      });
    }),
  },
};
