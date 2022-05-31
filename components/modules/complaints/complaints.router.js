import Router from "express";
import ComplaintsController from "./complaints.controller.js";

const ComplaintsRouter = new Router();

ComplaintsRouter.get("/complaints/:tenderId", ComplaintsController.getForTender);
ComplaintsRouter.post("/complaint/:tender_id", ComplaintsController.createOne);
// ComplaintsRouter.delete("/complaint/:tender_id", ComplaintsController.deleteOne);


export default ComplaintsRouter;
