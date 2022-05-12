import Router from "express";
import ComplaintsController from "./complaints.controller.js";

const ComplaintsRouter = new Router();

ComplaintsRouter.get("/complaints/:tenderId", ComplaintsController.getForTender);

export default ComplaintsRouter;
