import ComplaintsService from "./complaints.service.js";

class ComplaintsController {
  async getForTender(req, res, next) {
    try {
      const { tenderId } = req.params;
      const complaints = await ComplaintsService.getForTender(tenderId);
      res.status(200).json(complaints);
    } catch (error) {
      next(error);
    }
  }
}

export default new ComplaintsController();
