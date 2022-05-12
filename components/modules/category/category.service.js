import databasePool from "../../shared/database.js";

class CategoryController {
  async getOne(id) {
    const query = `SELECT * FROM category WHERE category_id = ${id}`;
    const category = await databasePool.query(query);
    return category[0][0];
  }

  async getAll() {
    const query = `SELECT * FROM category`;
    const categories = await databasePool.query(query);
    return categories[0];
  }
}

export default new CategoryController();
