import Router from "express";
import AuthController from "./auth.controller.js";

const AuthRouter = new Router();

AuthRouter.post("/registration", AuthController.registration);

export default AuthRouter;