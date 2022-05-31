import databasePool from "../../shared/database.js";
import TokenService from "../token/token.service.js";
class ComplaintsService {
  async getForTender(tender_id) {
    const query = `SELECT * FROM complaint WHERE tender_id = ${tender_id};`;
    const complaints = await databasePool.query(query);
    return complaints[0];
  }

  async createOne(tender_id, complaint, refreshToken) {
    try {
      await TokenService.validateAccessToken();
      const query = `INSERT INTO complaint
      (complaint_id, tender_id, author_id, topic, description, date_of_publication) 
      VALUES 
      (complaint_id, ${tender_id}, '1', "${complaint.topic}", "${complaint.description}", NOW())`;
      const data = await databasePool.query(query);
      const getThisComplainQuery = `SELECT * FROM complaint WHERE complaint_id = ${data[0].insertId}`;
      const thisComplaint = await databasePool.query(getThisComplainQuery);
      return thisComplaint[0][0];
    } catch (e) {
      console.log(e);
    }
  }

  // async deleteOne(tender_id) {

  //   const query = `SELECT * FROM complaint WHERE tender_id = ${tender_id};`;
  //   const complaints = await databasePool.query(query);
  //   return complaints[0];
  // }
}

export default new ComplaintsService();
