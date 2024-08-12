import { PlanetModel } from "../domain/model/Planet";
import PlanetsRepositoryServerless from "../infraestructure/Planet.repository";

class PlanetsService {
  private planetsRepositoryServerless: PlanetsRepositoryServerless;

  constructor(planetsRepository: PlanetsRepositoryServerless) {
    this.planetsRepositoryServerless = planetsRepository;
  }

  public async fetchPlanets(): Promise<PlanetModel[]> {
    return this.planetsRepositoryServerless.fetchPlanets();
  }

  public async fetchAndSavePlanets(): Promise<void> {
    const planets = await this.planetsRepositoryServerless.fetchPlanetsFromSwapi();

    for (const element of planets) {
      await this.planetsRepositoryServerless.savePlanet(element);
    }
  }
}

export default PlanetsService;
