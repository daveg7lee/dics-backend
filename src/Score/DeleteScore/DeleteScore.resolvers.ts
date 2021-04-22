import client from '../../client';
import { protectedResolver } from '../../utils';

export default {
  Mutation: {
    deleteScore: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const scoreExists = client.score.findUnique({ where: { id } });
      if (loggedInUser.type === 'Admin' && scoreExists) {
        await client.score.delete({ where: { id } });
        return true;
      } else {
        throw Error("You Can't");
      }
    }),
  },
};
