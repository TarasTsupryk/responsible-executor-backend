import Router from "express";
import SettlementController from "./settlement.controller.js";

const SettlementRouter = new Router();

SettlementRouter.get("/regions", SettlementController.getRegions);
// SettlementRouter.get("/settlements", UserController.getSettlements);

export default SettlementRouter;
