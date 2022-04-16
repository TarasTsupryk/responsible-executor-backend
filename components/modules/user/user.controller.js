import UserService from "./user.service.js";

class UserController {
  async getAll(_, res, next) {
    try {
      const response = await UserService.getAll();
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async activateOne(req, res, next) {
    try {
      const { activate_code } = req.params;
      const response = await UserService.activateOne(activate_code);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async checkEmail(req, res, next) {
    try {
      const { email } = req.body;
      const response = await UserService.checkEmail(email);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
