import Router from "express";
import UserController from "./user.controller.js";

const UserRouter = new Router();

UserRouter.get("/users", UserController.getAll);

export default UserRouter;
