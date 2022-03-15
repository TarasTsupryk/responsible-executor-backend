import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import databasePool from "../../shared/database.js";
import EmailService from "../email/email.service.js";
import { valideteEmail, validetePassword } from "./auth.utils.js";
import { SERVER_URL } from "../../shared/env.js";

dotenv.config();

class AuthService {
  async registration(reqBody) {
    const { email, password, firstName, lastName } = reqBody;
    const ACTIVATION_CODE = uuidv4();
    const activationLink = `${SERVER_URL}/activate-account/${ACTIVATION_CODE}`;

    await valideteEmail(email);
    validetePassword(password);

    const createUserSQL = `INSERT INTO users
       (user_id, email, password, first_name, last_name, registration_date, activation_link)
      VALUES
       (user_id, "${email}", "${password}", "${firstName}", "${lastName}", NOW(), "${ACTIVATION_CODE}")`;

    await databasePool.query(createUserSQL);

    await EmailService.sendActivationMail(
      email,
      activationLink,
      `${firstName} ${lastName}`
    );
  }
}

export default new AuthService();
