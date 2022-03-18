import AuthService from "./auth.service.js";
import { DAY } from "../../shared/utils/time.js";
class AuthController {
  static setTookenInCookie(res, token) {
    res.cookie("refreshToken", token, {
      maxAge: 30 * DAY,
      httpOnly: true,
    });
  }

  async registration(req, res, next) {
    try {
      const userData = await AuthService.registration(req.body);
      AuthController.setTookenInCookie(res, userData.refreshToken);
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const userData = await AuthService.login(req.body);
      AuthController.setTookenInCookie(res, userData.refreshToken);
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await AuthService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await AuthService.refresh(refreshToken);
      AuthController.setTookenInCookie(res, userData.refreshToken);
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
