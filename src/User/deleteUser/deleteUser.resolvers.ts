import client from "../../client";

export default {
  Mutation: {
    deleteUser: async (_, { username }) => {
      const userExists = await client.user.findUnique({ where: { username } });
      if (!userExists) {
        return false;
      }
      await client.user.delete({ where: { username } });
      return true;
    },
  },
};
