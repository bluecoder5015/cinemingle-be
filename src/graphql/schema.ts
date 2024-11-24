import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    movies: [Movie]
    getMovie(id: ID!): Movie
  }
  type Movie {
    id: ID!
    title: String!
    thumbnail: String!
    description: String
    releaseDate: String
    genre: [String]
    rating: Float
    duration: Int
  }
`;
