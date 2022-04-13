import databasePool from "../../shared/database.js";

class SettlementController {
  async getRegions() {
    const query = "SELECT * FROM region";
    const regions = await databasePool.query(query);
    return regions[0];
  }

  async getSettlements(region) {
    const query = `SELECT category, name, community FROM settlement WHERE region = "${region}"`;
    const regions = await databasePool.query(query);
    return regions[0];
  }
}

export default new SettlementController();
