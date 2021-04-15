import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchUser: async (_, args) => {
      if (args.term === "") {
        return [];
      } else {
        return prisma.users({
          where: { username_starts_with: args.term },
        });
      }
    },
  },
};
