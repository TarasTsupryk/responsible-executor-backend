import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRouter from "./modules/user/user.router.js";
import AuthRouter from "./modules/auth/auth.router.js";
import SettlementRouter from "./modules/settlement/settlement.router.js";
import apiErrorMiddleware from "./modules/middlewares/error.middleware.js";
import headersMiddleware from "./modules/middlewares/headers.middleware.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(headersMiddleware);
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const API_URL = "";
const AUTH_URL = "/auth";

app.use(AUTH_URL, AuthRouter);
app.use(API_URL, UserRouter);
app.use(API_URL, SettlementRouter);
app.use(apiErrorMiddleware);

export default app;
