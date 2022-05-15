import databasePool from "../../shared/database.js";

class ComplaintsService {
  async getForTender(tender_id) {
    const query = `SELECT * FROM complaint WHERE tender_id = ${tender_id};`;
    const complaints = await databasePool.query(query);
    return complaints[0];
  }
}

export default new ComplaintsService();
