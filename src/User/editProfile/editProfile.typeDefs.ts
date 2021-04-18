import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    editProfile(
      email: String
      avatar: Upload
      bio: String
      oldPassword: String
      newPassword: String
    ): Boolean
  }
`;
