import { gql } from 'apollo-server-express';

export default gql`
  type Score {
    id: String!
    score: Int!
    article: String!
    user: User!
    type: String!
    date: String!
    uploader: String!
  }
`;
