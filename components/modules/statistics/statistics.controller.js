import StatisticsService from "./statistics.service.js";

class StatisticsController {
  async getMainStatistics(_, res, next) {
    try {
      const statistics = await StatisticsService.getMainStatistics();
      res.status(200).json(statistics);
    } catch (error) {
      next(error);
    }
  }
}

export default new StatisticsController();
