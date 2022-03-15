import databasePool from "../../shared/database.js";

class UserService {
  async getAll() {
    const select_users_query = "SELECT * FROM users";
    const users = await databasePool.query(select_users_query);
    return users[0];
  }

  async activateOne(activation_link) {
    const activate_user_query = `UPDATE users SET is_active = 1 WHERE activation_link = "${activation_link}"`;
    await databasePool.query(activate_user_query);
    return {
      text: "SUCCESS",
    };
  }

  async create(email, password, firstName, lastName, activationCode) {
    const createUserSQL = `INSERT INTO users
    (user_id, email, password, first_name, last_name, registration_date, activation_link)
   VALUES
    (user_id, "${email}", "${password}", "${firstName}", "${lastName}", NOW(), "${activationCode}")`;

    await databasePool.query(createUserSQL);
  }

  async findByEmail(email) {
    const query = `SELECT * FROM users WHERE email = "${email}"`;
    const data = await databasePool.query(query);
    return data[0][0];
  }
}

export default new UserService();
