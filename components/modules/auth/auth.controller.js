import AuthService from "./auth.service.js";
import Response from "../../shared/response.js";

class AuthController {
  async registration(req, res) {
    try {
      await AuthService.registration(req.body);
      res.status(200).json({text: "user added"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AuthController();
