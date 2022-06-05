import databasePool from "../../shared/database.js";
import TokenService from "../token/token.service.js";
import CompanyValidator from "./company.validator.js";
import ApiError from "../exceptions/api.error.js";
class CompanyService {
  async getForUser(user_id) {
    const query = `SELECT * FROM provider WHERE owner_id = ${user_id}`;
    const company = await databasePool.query(query);
    return company[0][0];
  }

  async createOne(company, accessToken) {
    const validate = CompanyValidator.validate(company);
    if (!validate) {
      throw ApiError.badRequest("Не коректні дані");
    }

    const { full_name, short_name, classification, ownership, registry_code } =
      company;

    const { user_id } = TokenService.validateAccessToken(accessToken);
    if (!user_id) return null;
    const query = `INSERT INTO provider (provider_id, full_name, short_name, registry_code, ownership, classification, owner_id) 
                     VALUES 
                     (provider_id, "${full_name}", "${short_name}", "${registry_code}", "${ownership}", "${classification}", ${user_id}) `;
    const data = await databasePool.query(query);
    return data[0];
  }
}

export default new CompanyService();
