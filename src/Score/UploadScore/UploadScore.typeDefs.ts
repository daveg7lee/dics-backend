import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    UploadScore(
      score: Int!
      article: String!
      username: String!
      type: String!
      date: String!
      uploader: String!
    ): Boolean!
  }
`;
