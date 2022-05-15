import Router from "express";
import SpecificationController from "./specification.controller.js";

const SpecificationRouter = new Router();

SpecificationRouter.get("/specification/:tenderId", SpecificationController.getForTender);

export default SpecificationRouter;
