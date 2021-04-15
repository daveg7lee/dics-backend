import { prisma } from '../../../generated/prisma-client';

export default {
  User: {
    scores: ({ id }) => prisma.user({ id }).scores(),
  },
};
