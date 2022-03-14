import databasePool from "../../shared/database.js";

class UserService {
  async getAll() {
    const select_users_query = "SELECT * FROM users";
    const users = await databasePool.query(select_users_query);
    return users[0];
  }

  async activateOne(activation_link) {
    const activate_user_query = `UPDATE users SET is_active = 1 WHERE activation_link = "${activation_link}"`;
    await databasePool.query(activate_user_query)
    return {
      text: "SUCCESS"
    }
  }
}

export default new UserService();
