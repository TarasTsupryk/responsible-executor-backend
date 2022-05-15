import SpecificationService from "./specification.service.js";

class SpecificationController {
  async getForTender(req, res, next) {
    try {
      const { tenderId } = req.params;
      const specification = await SpecificationService.getForTender(tenderId);
      res.status(200).json(specification);
    } catch (error) {
      next(error);
    }
  }
}

export default new SpecificationController();
