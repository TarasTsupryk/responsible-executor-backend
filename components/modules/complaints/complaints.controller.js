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

  async createOne(req, res, next) {
    try {
      const { tender_id } = req.params;
      const { refreshToken } = req.cookies;
      const complaints = await ComplaintsService.createOne(
        tender_id,
        req.body,
        refreshToken
      );
      res.status(200).json(complaints);
    } catch (error) {
      next(error);
    }
  }

  // async deleteOne(req, res, next) {
  //   try {
  //     const { tender_id } = req.params;
  //     const complaints = await ComplaintsService.deleteOne(tender_id, req.body);
  //     res.status(200).json(complaints);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

export default new ComplaintsController();
