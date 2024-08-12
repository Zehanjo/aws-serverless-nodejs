import express, { Router, Request, Response } from "express";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Importa los servicios y controladores

import { FilmService } from "../module/film/application/Film.service";
import { FilmController } from "../module/film/infraestructure/controller/Film";

import { PeopleRepositoryServerless } from "../module/people/infraestructure/People.repository";
import { PeopleService } from "../module/people/application/People.service";
import { PeopleController } from "../module/people/infraestructure/controller/People";
import FilmRepositoryServerless from "../module/film/infraestructure/Film.repository";
import PlanetsRepositoryServerless from "../module/planets/infraestructure/Planet.repository";
import PlanetsService from "../module/planets/application/Planet.service";
import PlanetsController from "../module/planets/infraestructure/controller/Planet";

// Inicializa DynamoDB
const client = new DynamoDBClient({});
const dynamoClient = DynamoDBDocumentClient.from(client);

// Crea una instancia del enrutador de Express
const router: Router = express.Router();

// Configura los repositorios, servicios y controladores
const planetsRepository = new PlanetsRepositoryServerless(dynamoClient);
const planetsService = new PlanetsService(planetsRepository);
const planetController = new PlanetsController(planetsService);

const filmRepository = new FilmRepositoryServerless(dynamoClient);
const filmService = new FilmService(filmRepository);
const filmController = new FilmController(filmService);

const peopleRepository = new PeopleRepositoryServerless(dynamoClient);
const peopleService = new PeopleService(peopleRepository);
const peopleController = new PeopleController(peopleService);

// Ruta raíz
router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the API!" });
});

// Rutas de la API
router.use('/planet', planetController.router);
router.use('/film', filmController.router);
router.use('/people', peopleController.router);

export default router;
