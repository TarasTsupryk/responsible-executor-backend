import UserService from "./user.service.js";

class UserController {
  async getAll(_, res) {
    try {
      const response = await UserService.getAll();
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new UserController();
