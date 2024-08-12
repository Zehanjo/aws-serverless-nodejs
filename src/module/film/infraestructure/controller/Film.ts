import express, { Request, Response, Router } from "express";
import { FilmService } from "../../application/Film.service";

export class FilmController {
  private filmServiceServerless: FilmService;
  public router: Router;

  constructor(filmService: FilmService) {
    this.filmServiceServerless = filmService;
    this.router = express.Router();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/", this.fetchFilm.bind(this));
    this.router.post("/add", this.fetchAndSaveFilm.bind(this));
  }

  private async fetchAndSaveFilm(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.filmServiceServerless.fetchAndSaveFilm();
      console.log(response);
      res.json({
        statusCode: 200,
        message: "Film fetched and saved successfully.",
      });
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).json({
        error: error.message || "Internal Server Error",
      });
    }
  }

  private async fetchFilm(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.filmServiceServerless.fetchFilm();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).json({
        error: error.message || "Internal Server Error",
      });
    }
  }
}

export default FilmController;
