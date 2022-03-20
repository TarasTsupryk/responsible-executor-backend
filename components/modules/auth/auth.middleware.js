import ApiError from "../exceptions/api.error.js";
import TokenService from "../token/token.service.js";

export default function authMiddleware(req, res, next) {
  try {
    const authorizationHeader = req?.headers?.authorization;
    if (!authorizationHeader) {
      throw ApiError.unauthorizedUser();
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      throw ApiError.unauthorizedUser();
    }

    const userData = TokenService.validateAccessToken(token);
    if (!userData) {
      throw ApiError.unauthorizedUser();
    }

    next();
  } catch (error) {
    next(ApiError.unauthorizedUser());
  }
}
