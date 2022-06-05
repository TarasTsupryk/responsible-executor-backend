import CompanyService from "./company.service.js";

class CompanyController {
  async getForUser(req, res, next) {
    try {
      const { user_id } = req.params;
      const company = await CompanyService.getForUser(user_id);
      res.status(200).json(company);
    } catch (error) {
      next(error);
    }
  }

  async createOne(req, res, next) {
    try {
      const accessToken = req.headers.authorization;
      const company = await CompanyService.createOne(req.body, accessToken);
      res.status(200).json(company);
    } catch (error) {
      next(error);
    }
  }
}

export default new CompanyController();
