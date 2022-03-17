import AuthService from "./auth.service.js";
import { DAY } from "../../shared/utils/time.js";
class AuthController {
  async registration(req, res, next) {
    try {
      const userData = await AuthService.registration(req.body);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * DAY,
        httpOnly: true,
      });
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
