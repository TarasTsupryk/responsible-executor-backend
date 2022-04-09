import SettlementService from "./settlement.service.js";

class SettlementController {
  async getRegions(_, res, next) {
    try {
      const response = await SettlementService.getRegions();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new SettlementController();
