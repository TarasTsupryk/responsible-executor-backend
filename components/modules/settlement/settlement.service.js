import databasePool from "../../shared/database.js";

class SettlementController {
  async getRegions() {
    const query = "SELECT * FROM region";
    const regions = await databasePool.query(query);
    return regions[0];
  }
}

export default new SettlementController();
