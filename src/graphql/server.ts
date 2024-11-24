import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolver";

export const createGraphQLServer = () => {
  return new ApolloServer({ typeDefs, resolvers });
};
