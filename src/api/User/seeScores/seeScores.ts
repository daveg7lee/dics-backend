import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeScores: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.scores({ where: { user } });
    },
  },
};
