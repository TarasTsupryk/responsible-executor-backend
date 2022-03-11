import express from "express";
import cors from "cors";
import UserRouter from "./modules/user/user.router.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const API_URL = "/api";
app.use(API_URL, UserRouter);

export default app;
