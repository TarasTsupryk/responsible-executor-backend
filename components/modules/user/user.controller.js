import UserService from "./user.service.js";

class UserController {
  async getAll(_, res) {
    try {
      const response = await UserService.getAll();
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async activateOne(req, res) {
    try {
      const { activate_code } = req.params;
      const response = await UserService.activateOne(activate_code);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(e.message);
    }
  }
}

export default new UserController();
