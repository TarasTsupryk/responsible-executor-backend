import Router from "express";
import UserController from "./user.controller.js";

const UserRouter = new Router();

UserRouter.get("/users", UserController.getAll);
UserRouter.get("/activate-account/:activate_code", UserController.activateOne);

export default UserRouter;
