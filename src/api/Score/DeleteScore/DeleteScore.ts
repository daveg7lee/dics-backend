import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteScore: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id } = args;
      const scoreExists = prisma.$exists.score({ id });
      const admin = user.type;
      if (admin === "Admin" && scoreExists) {
        await prisma.deleteScore({ id });
        return true;
      } else {
        throw Error("You Can't");
      }
    },
  },
};
