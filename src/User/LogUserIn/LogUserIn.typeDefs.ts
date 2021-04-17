import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    LogUserIn(username: String!, password: String!): String!
  }
`;
