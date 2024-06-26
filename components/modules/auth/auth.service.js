import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import UserService from "../user/user.service.js";
import EmailService from "../email/email.service.js";
import Validator from "./auth.utils.js";
import { SERVER_URL } from "../../shared/utils/env.js";
import TokenService from "../token/token.service.js";
import UserDto from "../user/user.dto.js";
import ApiError from "../exceptions/api.error.js";

dotenv.config();

class AuthService {
  async registration(user) {
    const { email, firstName, lastName } = user;
    const ACTIVATION_CODE = uuidv4();
    const activationLink = `${SERVER_URL}/activate-account/${ACTIVATION_CODE}`;

    await Validator.validateUserData(user);

    await UserService.create(user, ACTIVATION_CODE);

    await EmailService.sendActivationMail(
      email,
      activationLink,
      `${firstName} ${lastName}`
    );

    const userFromDb = await UserService.findByEmail(email);
    const userDto = UserDto.token(userFromDb);
    const tokens = TokenService.genetateTokens({ ...userDto });
    await TokenService.saveToken(userDto.user_id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(user) {
    const userData = await Validator.validateLogin(user);
    const userDto = UserDto.token(userData);
    const tokens = TokenService.genetateTokens({ ...userDto });
    await TokenService.saveToken(userDto.user_id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorizedUser();
    }

    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await TokenService.findByToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw ApiError.unauthorizedUser();
    }

    const userDto = UserDto.token(userData);
    const tokens = TokenService.genetateTokens({ ...userDto });
    await TokenService.saveToken(userDto.user_id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
}

export default new AuthService();
