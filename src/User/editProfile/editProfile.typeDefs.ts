import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    editProfile(
      email: String
      avatar: String
      bio: String
      oldPassword: String
      newPassword: String
    ): Boolean
  }
`;
