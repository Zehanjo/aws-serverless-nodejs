const express = require("express");

class PeopleController {
  constructor(peopleService) {
    this.peopleServiceServerless = peopleService;
    this.router = express.Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/", this.fetchPeople.bind(this));
    this.router.post("/add", this.fetchAndSavePeople.bind(this));
  }

  async fetchAndSavePeople(req, res) {
    try {
      const response =
        await this.peopleServiceServerless.fetchAndSavePeople();
      console.log(response);
      res.json({
        statusCode: 200,
        message: "People fetched and saved successfully."
      });
    } catch (error) {
      console.log(error);
      res.status(!error.status ? 500 : error.code).json({
        error: error,
      });
    }
  }

  async fetchPeople(req, res) {
    try {
      const response = await this.peopleServiceServerless.fetchPeople();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(!error.status ? 500 : error.code).json({
        error: !error.status ? "Internal Server Error" : error.message,
      });
    }
  }
}

module.exports = PeopleController;
