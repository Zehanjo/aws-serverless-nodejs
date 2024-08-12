import express, { Request, Response, Router } from 'express';
import PlanetsService from '../../application/Planet.service';

class PlanetsController {
  private planetsServiceServerless: PlanetsService;
  public router: Router;

  constructor(planetsService: PlanetsService) {
    this.planetsServiceServerless = planetsService;
    this.router = express.Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/", this.fetchPlanets.bind(this));
    this.router.post("/add", this.fetchAndSavePlanets.bind(this));
  }

  private async fetchAndSavePlanets(req: Request, res: Response): Promise<void> {
    try {
      await this.planetsServiceServerless.fetchAndSavePlanets();
      res.json({
        statusCode: 200,
        message: "Planets fetched and saved successfully."
      });
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).json({
        error: error.message || 'Internal Server Error',
      });
    }
  }

  private async fetchPlanets(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.planetsServiceServerless.fetchPlanets();
      res.json(response);
    } catch (error) {
      res.status(error.status || 500).json({
        error: error.message || 'Internal Server Error',
      });
    }
  }
}

export default PlanetsController;
