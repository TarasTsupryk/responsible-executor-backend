import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import UserService from "../user/user.service.js";
import EmailService from "../email/email.service.js";
import { valideteEmail, validetePassword } from "./auth.utils.js";
import { SERVER_URL } from "../../shared/utils/env.js";
import TokenService from "../token/token.service.js";
import UserDto from "../user/user.dto.js";
import databasePool from "../../shared/database.js";
import ApiError from "../exceptions/api.error.js";

dotenv.config();
class AuthService {
  async registration(reqBody) {
    const { email, password, firstName, lastName } = reqBody;
    const ACTIVATION_CODE = uuidv4();
    const activationLink = `${SERVER_URL}/activate-account/${ACTIVATION_CODE}`;

    await valideteEmail(email);
    validetePassword(password);

    await UserService.create(
      email,
      password,
      firstName,
      lastName,
      ACTIVATION_CODE
    );

    await EmailService.sendActivationMail(
      email,
      activationLink,
      `${firstName} ${lastName}`
    );

    const user = await UserService.findByEmail(email);
    const userDto = new UserDto(user);
    const tokens = TokenService.genetateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(resBody) {
    const { email, password } = resBody;
    const query = `SELECT * FROM users WHERE email = "${email}"`;
    const response = await databasePool.query(query);
    const userData = response[0][0];
    if (!userData) {
      throw ApiError.badRequest(ApiError.errorMessages.USER_DOES_NOT_EXIST);
    }

    if (userData.password !== password) {
      throw ApiError.badRequest(ApiError.errorMessages.WRONG_PASSWORD);
    }

    const userDto = new UserDto(userData);
    const tokens = TokenService.genetateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }
}

export default new AuthService();
