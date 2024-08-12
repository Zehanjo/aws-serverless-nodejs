const express = require("express")
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const PlanetsService =  require("../module/planets/application/Planet.service");
const PlanetsController = require("../module/planets/infraestructure/controller/Planet");
const PlanetsRepositoryServerless = require("../module/planets/infraestructure/Planet.repository");

const FilmRepositoryServerless = require("../module/film/infraestructure/Film.repository");
const FilmService = require("../module/film/application/Film.service");
const FilmController = require("../module/film/infraestructure/controller/Film");
const PeopleRepositoryServerless = require("../module/people/infraestructure/People.repository");
const PeopleService = require("../module/people/application/People.service");
const PeopleController = require("../module/people/infraestructure/controller/People");

const client = new DynamoDBClient();
const dynamoClient = DynamoDBDocumentClient.from(client);
const router = express.Router();

const planetsRepository = new PlanetsRepositoryServerless(dynamoClient);
const planetsService = new PlanetsService(planetsRepository);
const planetController = new PlanetsController(planetsService);

const filmRepository = new FilmRepositoryServerless(dynamoClient);
const filmService = new FilmService(filmRepository);
const filmController = new FilmController(filmService);

const peopleRepository = new PeopleRepositoryServerless(dynamoClient);
const peopleService = new PeopleService(peopleRepository);
const peopleController = new PeopleController(peopleService);

router.get("/", (req, res) => {
  res.json({ message: `Welcome to the API!`});
});

router.use('/planet', planetController.router);
router.use('/film', filmController.router);
router.use('/people', peopleController.router);



module.exports = router;