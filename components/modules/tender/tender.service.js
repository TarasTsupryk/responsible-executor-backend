import databasePool from "../../shared/database.js";
import TokenService from "../token/token.service.js";
import ApiError from "../exceptions/api.error.js";

class TenderService {
  async getOne(tenderId) {
    const query = `SELECT * FROM tender WHERE tender_id = ${tenderId}`;
    const responseFromDB = await databasePool.query(query);
    return responseFromDB[0][0];
  }

  async getAll() {
    const query = `SELECT * FROM tender`;
    const responseFromDB = await databasePool.query(query);
    return responseFromDB[0];
  }

  async create(tender, refreshToken) {
    const userData = TokenService.validateRefreshToken(refreshToken);

    if (!userData) {
      throw ApiError.unauthorizedUser();
    }

    const { user_id } = userData;
    const { title, description, expected_cost, currency_code } = tender;
    const query = `INSERT INTO tender (tender_id, owner_id, title, description, date_of_publication, expected_cost, currency_code, status)
    VALUES 
    (tender_id, ${user_id}, "${title}", "${description}", NOW(), ${expected_cost}, ${currency_code}, 1)`;
    const responseFromDB = await databasePool.query(query);
    return responseFromDB[0];
  }
}

export default new TenderService();
