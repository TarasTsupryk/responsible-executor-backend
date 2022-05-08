import Router from "express";
import CategoryController from "./category.controller.js";

const CategoryRouter = new Router();

CategoryRouter.get("/category/:id", CategoryController.getOne);
CategoryRouter.get("/categories", CategoryController.getAll);

export default CategoryRouter;
