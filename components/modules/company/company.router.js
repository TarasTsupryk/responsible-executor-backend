import Router from "express";
import CompanyController from "./company.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const CompanyRouter = new Router();

CompanyRouter.get("/company/:user_id", CompanyController.getForUser);
CompanyRouter.post("/company", authMiddleware, CompanyController.createOne);

export default CompanyRouter;
