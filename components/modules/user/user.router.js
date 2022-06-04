import Router from "express";
import UserController from "./user.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const UserRouter = new Router();

// UserRouter.get("/users", authMiddleware, UserController.getAll);
UserRouter.get("/user", authMiddleware, UserController.getOne);
UserRouter.get("/activate-account/:activate_code", UserController.activateOne);
UserRouter.post("/checkemail", UserController.checkEmail);

export default UserRouter;
