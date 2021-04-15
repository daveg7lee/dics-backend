import { prisma, User } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    UploadScore: async (
      _,
      args,
      { request, isAuthenticated }
    ): Promise<Boolean> => {
      isAuthenticated(request);
      let { score, article, username, type, date, uploader } = args;
      const userNameExist: boolean = await prisma.$exists.user({ username });
      if (userNameExist) {
        const user: User = await prisma.user({ username });
        try {
          await prisma.createScore({
            score,
            article,
            type,
            user: { connect: { id: user.id } },
            date,
            uploader
          });
          return true;
        } catch (e) {
          console.log(e);
        }
      } else {
        throw Error("This user is not found");
      }
    },
  },
};
