import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    deleteUser(username: String!): Boolean!
  }
`;
