import databasePool from "../../shared/database.js";

class StatisticsService {
  async getMainStatistics() {
    const query = `
    SELECT COUNT(*) as value FROM user WHERE type = "provider" 
    UNION
    SELECT COUNT(*) FROM user WHERE  type = "customer" 
    UNION
    SELECT COUNT(*) FROM tender 
    UNION
    SELECT SUM(expected_cost) FROM tender 
    `;
    const statistics = await databasePool.query(query);
    return statistics[0];
  }
}

export default new StatisticsService();
