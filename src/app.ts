import express, { Application } from "express";
import testRoutes from "./routes/testapi";

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/test", testRoutes);

export default app;
