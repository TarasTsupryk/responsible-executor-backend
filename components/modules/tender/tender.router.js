import Router from "express";
import authMiddleware from "../auth/auth.middleware.js";
import TenderController from "./tender.controller.js";

const TenderRouter = new Router();

TenderRouter.get("/tender/:id", TenderController.getOne);
TenderRouter.get("/tenders", TenderController.getAll);
TenderRouter.post("/tender", authMiddleware, TenderController.create);

export default TenderRouter;
