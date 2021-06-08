import { gql } from 'apollo-server';

export default gql`
  type User {
    id: String!
    avatar: String!
    username: String!
    email: String!
    password: String!
    bio: String
    type: String!
    createdAt: String!
    scores: [Score]
    totalScores: Int!
    totalMerit: Int!
  }
`;
