import client from '../client';

export default {
  User: {
    scores: ({ id }) => client.user.findUnique({ where: { id } }).scores(),
    totalScores: async ({ id }) => {
      const scores = await client.user.findUnique({ where: { id } }).scores();
      let total = 0;
      scores.map((score) => {
        if (score.type === 'Demerit') {
          total -= score.score;
        } else {
          total += score.score;
        }
      });
      return total;
    },
  },
};
