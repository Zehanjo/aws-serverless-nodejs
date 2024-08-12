import express, { Request, Response } from "express";
import { PeopleService } from "../../application/People.service"; // Ajusta la ruta según tu estructura de archivos

export class PeopleController {
  private peopleServiceServerless: PeopleService;
  public router: express.Router;

  constructor(peopleService: PeopleService) {
    this.peopleServiceServerless = peopleService;
    this.router = express.Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/", this.fetchPeople.bind(this));
    this.router.post("/add", this.fetchAndSavePeople.bind(this));
  }

  public async fetchAndSavePeople(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.peopleServiceServerless.fetchAndSavePeople();
      console.log(response);
      res.json({
        statusCode: 200,
        message: "People fetched and saved successfully.",
      });
    } catch (error: any) {
      console.log(error);
      res.status(error.status || 500).json({
        error: error.message || "Internal Server Error",
      });
    }
  }

  public async fetchPeople(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.peopleServiceServerless.fetchPeople();
      res.json(response);
    } catch (error: any) {
      console.log(error);
      res.status(error.status || 500).json({
        error: error.message || "Internal Server Error",
      });
    }
  }
}
