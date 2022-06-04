import ApiError from "../exceptions/api.error.js";
import TokenService from "../token/token.service.js";

export default function authMiddleware(req, _, next) {
  try {
    const authorizationHeader = req?.headers?.authorization;
    if (!authorizationHeader) {
      throw ApiError.unauthorizedUser();
    }

    if (!authorizationHeader) {
      throw ApiError.unauthorizedUser();
    }

    const userData = TokenService.validateAccessToken(authorizationHeader);
    if (!userData) {
      throw ApiError.unauthorizedUser();
    }

    next();
  } catch (error) {
    next(ApiError.unauthorizedUser());
  }
}
