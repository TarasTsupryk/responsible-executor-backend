import databasePool from "../../shared/database.js";
import TokenService from "../token/token.service.js";

class UserService {
  async getAll() {
    const select_users_query = "SELECT * FROM user";
    const users = await databasePool.query(select_users_query);
    return users[0];
  }

  async getOne(accessToken) {
    const userData = TokenService.validateAccessToken(accessToken);
    const { user_id } = userData;
    const select_users_query = `SELECT * FROM user WHERE user_id = ${user_id}`;
    const users = await databasePool.query(select_users_query);
    return users[0][0];
  }

  async activateOne(activation_link) {
    const activate_user_query = `UPDATE user SET is_active = 1 
    WHERE activation_code = "${activation_link}"`;
    await databasePool.query(activate_user_query);
    return {
      text: "SUCCESS",
    };
  }

  async create(user, activateCode) {
    const { type, firstName, lastName, email, password, phoneNumber } = user;
    const createUserSQL = `INSERT INTO user 
    (user_id, type, email, password, first_name, last_name, phone_number, is_active, registration_date, activation_code) 
    VALUES 
    (user_id, "${type}", "${email}", "${password}", "${firstName}", "${lastName}", "${phoneNumber}", 0, NOW(), "${activateCode}")`;

    await databasePool.query(createUserSQL);
  }

  async findByEmail(email) {
    const query = `SELECT * FROM user WHERE email = "${email}"`;
    const data = await databasePool.query(query);
    return data[0][0];
  }

  async checkEmail(email) {
    const query = `SELECT * FROM user WHERE email = "${email}"`;
    const data = await databasePool.query(query);
    return { value: !!data[0][0] };
  }
}

export default new UserService();
