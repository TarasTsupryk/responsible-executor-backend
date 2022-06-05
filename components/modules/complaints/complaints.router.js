import Router from "express";
import ComplaintsController from "./complaints.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const ComplaintsRouter = new Router();

ComplaintsRouter.get(
  "/complaints/:tenderId",
  ComplaintsController.getForTender
);
ComplaintsRouter.post(
  "/complaint/:tender_id",
  authMiddleware,
  ComplaintsController.createOne
);
ComplaintsRouter.delete(
  "/complaint/:complaint_id",
  authMiddleware,
  ComplaintsController.deleteOne
);

export default ComplaintsRouter;
