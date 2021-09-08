import { gql } from 'apollo-server';

export default gql`
  type Query {
    searchScore(term: String!): [Score]
  }
`;
