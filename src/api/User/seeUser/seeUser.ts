import { prisma, User } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeUser: async (_, { username }): Promise<User> => {
      return prisma.user({ username });
    },
  },
};
