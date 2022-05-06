import Router from "express";
import StatisticsController from "./statistics.controller.js";

const StatisticsRouter = new Router();

StatisticsRouter.get(
  "/main_statistics",
  StatisticsController.getMainStatistics
);

export default StatisticsRouter;
