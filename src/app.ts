import express, { Application } from "express";
import testRoutes from "./routes/testapi";
import { createGraphQLServer } from "./graphql/server";
import { errorHandler } from "./middlewares/errorHandler";

const app: Application = express();

// Middleware to handle json objects from payload
app.use(express.json());

// Routes for rest apis
app.use("/", testRoutes);

// routes for graphql apis
const graphqlServer = createGraphQLServer();
graphqlServer.start().then(() => {
  graphqlServer.applyMiddleware({ app, path: "/graphql" });
});

// Global error handler
app.use(errorHandler);

export default app;
