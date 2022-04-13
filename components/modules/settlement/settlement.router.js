import Router from "express";
import SettlementController from "./settlement.controller.js";

const SettlementRouter = new Router();

SettlementRouter.get("/regions", SettlementController.getRegions);
SettlementRouter.post("/settlements", SettlementController.getSettlements);

export default SettlementRouter;
