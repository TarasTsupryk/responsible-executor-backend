import databasePool from "../../shared/database.js";

class UserService {
  async getAll() {
    try {
      const query = "SELECT * FROM users";
      const users = await databasePool.query(query);
      return users[0];
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserService();
