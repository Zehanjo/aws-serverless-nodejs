const express = require("express");

class FilmController {
  constructor(filmService) {
    this.filmServiceServerless = filmService;
    this.router = express.Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/", this.fetchFilm.bind(this));
    this.router.post("/add", this.fetchAndSaveFilm.bind(this));
  }

  async fetchAndSaveFilm(req, res) {
    try {
      const response = await this.filmServiceServerless.fetchAndSaveFilm();
      console.log(response);
      res.json({
        statusCode: 200,
        message: "Film fetched and saved successfully."
      });
    } catch (error) {
      console.log(error);
      res.status(!error.status ? 500 : error.code).json({
        error: error,
      });
    }
  }

  async fetchFilm(req, res) {
    try {
      const response = await this.filmServiceServerless.fetchFilm();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(!error.status ? 500 : error.code).json({
        error: !error.status ? "Internal Server Error" : error.message,
      });
    }
  }
}

module.exports = FilmController;
