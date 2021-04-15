import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUsers: async () => prisma.users({}),
  },
};
