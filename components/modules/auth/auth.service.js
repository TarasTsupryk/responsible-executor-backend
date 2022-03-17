import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import UserService from "../user/user.service.js";
import EmailService from "../email/email.service.js";
import { valideteEmail, validetePassword } from "./auth.utils.js";
import { SERVER_URL } from "../../shared/utils/env.js";
import TokenService from "../token/token.service.js";
import UserDto from "../user/user.dto.js";

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
}

export default new AuthService();
