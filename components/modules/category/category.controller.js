import CategoryService from "./category.service.js";

class CategoryController {
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const response = await CategoryService.getOne(id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAll(_, res, next) {
    try {
      const response = await CategoryService.getAll();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
