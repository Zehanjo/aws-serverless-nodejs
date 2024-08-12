const express = require("express");

class PlanetsController {
  constructor(planetsService) {
    this.planetsServiceServerless = planetsService;
    this.router = express.Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/", this.fetchPlanets.bind(this));
    this.router.post("/add", this.fetchAndSavePlanets.bind(this));
  }

  async fetchAndSavePlanets(req, res) {
    
    try {
      await this.planetsServiceServerless.fetchAndSavePlanets();
      res.json({
        statusCode: 200,
        message: "Planets fetched and saved successfully."
      });
    } catch (error) {
      console.log(error);

      res.status(!error.status ? 500 : error.code).json({
        error: error,
      });
    }
  }

  async fetchPlanets(req, res) {
    try {
      const response = await this.planetsServiceServerless.fetchPlanets(
        req.query
      );
      res.json(response);
    } catch (error) {
      res.status(!error.status ? 500 : error.code).json({
        error: !error.status ? "Internal Server Error" : error.message,
      });
    }
  }
}

module.exports = PlanetsController;
