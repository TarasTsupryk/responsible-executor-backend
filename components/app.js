import express from "express";
import cors from "cors";
import UserRouter from "./modules/user/user.router.js";
import AuthRouter from "./modules/auth/auth.router.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const API_URL = "";
const AUTH_URL = "/auth";

app.use(API_URL, UserRouter);
app.use(AUTH_URL, AuthRouter);

export default app;
