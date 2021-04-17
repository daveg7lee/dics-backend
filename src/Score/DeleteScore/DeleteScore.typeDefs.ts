import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    deleteScore(id: ID!): Boolean
  }
`;
