import databasePool from "../../shared/database.js";

class SpecificationService {
  async getForTender(tender_id) {
    const query = `SELECT * FROM specification WHERE tender_id = ${tender_id};`;
    const specification = await databasePool.query(query);
    return specification[0];
  }
}

export default new SpecificationService();
