import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRouter from "./modules/user/user.router.js";
import AuthRouter from "./modules/auth/auth.router.js";
import SettlementRouter from "./modules/settlement/settlement.router.js";
import apiErrorMiddleware from "./modules/middlewares/error.middleware.js";
import headersMiddleware from "./modules/middlewares/headers.middleware.js";
import StatisticsRouter from "./modules/statistics/statistics.router.js";
import TenderRouter from "./modules/tender/tender.router.js";
import CategoryRouter from "./modules/category/category.router.js";
import ComplaintsRouter from "./modules/complaints/complaints.router.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(headersMiddleware);
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.0.109:3000"],
  })
);

const API_URL = "";
const AUTH_URL = "/auth";

app.use(AUTH_URL, AuthRouter);
app.use(API_URL, UserRouter);
app.use(API_URL, SettlementRouter);
app.use(API_URL, StatisticsRouter);
app.use(API_URL, TenderRouter);
app.use(API_URL, CategoryRouter);
app.use(API_URL, ComplaintsRouter);
app.use(apiErrorMiddleware);

export default app;
