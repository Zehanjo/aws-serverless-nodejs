const PlanetModel = require("../domain/model/Planet");
class PlanetsService {
  constructor(planetsRepository) {
    this.planetsRepositoryServerless = planetsRepository;
  }

  async fetchPlanets(endPointData) {
    return this.planetsRepositoryServerless.fetchPlanets(endPointData);
  }

  async fetchPlanetsFromSwapi() { 
    return this.planetsRepositoryServerless.fetchPlanetsFromSwapi();
  }

  async fetchAndSavePlanets() {
    const planets = await this.planetsRepositoryServerless.fetchPlanetsFromSwapi();    
    
    for (const element of planets) {
      // const dataElement = new PlanetModel(element);
      console.log(element);
      
      await this.planetsRepositoryServerless.savePlanet(element);
    }
  }
}

module.exports = PlanetsService;
