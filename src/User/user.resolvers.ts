import client from '../client';

export default {
  User: {
    scores: ({ id }) => client.user.findUnique({ where: { id } }).scores(),
  },
};
