import TenderService from "./tender.service.js";

class TenderController {
  async getOne(req, res, next) {
    try {
      const { params } = req;
      const tender = await TenderService.getOne(params?.id);
      res.status(200).json(tender);
    } catch (error) {
      next(error);
    }
  }

  async getAll(_, res, next) {
    try {
      const tenders = await TenderService.getAll();
      res.status(200).json(tenders);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const data = await TenderService.create(req.body, refreshToken);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new TenderController();
