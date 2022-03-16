import AuthService from "./auth.service.js";
import Response from "../../shared/response.js";

class AuthController {
  async registration(req, res, next) {
    try {
      const userData = await AuthService.registration(req.body);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
