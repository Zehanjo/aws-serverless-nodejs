import { PlanetData } from "../model/Planet";

export abstract class PlanetsInterface {
  abstract fetchPlanetsFromSwapi(): Promise<PlanetData[]>;

  abstract fetchPlanets(): Promise<any>;

  abstract savePlanet(data: PlanetData): Promise<void>;
}
