import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    createAccount(
      username: String!
      email: String!
      bio: String
      password: String!
      type: String!
      avatar: String
    ): Boolean!
  }
`;
