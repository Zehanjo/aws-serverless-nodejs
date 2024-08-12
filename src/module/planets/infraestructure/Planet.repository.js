const { ScanCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
const PlanetsInterface = require("../domain/interface/Planet.interface");
const axios = require("axios");
const { v4 } = require("uuid");
const PlanetModel = require("../domain/model/Planet");

class PlanetsRepositoryServerless extends PlanetsInterface {
  constructor(DynamoDBClient) {
    super();
    this.dynamoClient = DynamoDBClient;
    this.tableName = "PlanetsTable";
  }

  async fetchPlanetsFromSwapi() {
    let data = [];
    let nextPageURL = "https://swapi.py4e.com/api/planets/?page=1";

    while (nextPageURL) {
      try {
        const response = await axios.get(nextPageURL);
        const dataPage = response.data;

        data = data.concat(dataPage.results);

        nextPageURL = dataPage.next;
      } catch (error) {
        console.error("Error fetching data from SWAPI:", error);
        throw new Error("Failed to fetch planets");
      }
    }

    return data;
  }

  async fetchPlanets(endPoint) {
    const data = [];
    const params = { TableName: this.tableName };
    try {
      const command = new ScanCommand(params);
      const { Items } = await this.dynamoClient.send(command);
      Items.forEach((element) => {
        const dataElement = new PlanetModel(element);
        data.push(dataElement);
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async savePlanet(data) {
    if (data) {
      const id = v4();
      const params = {
        TableName: this.tableName,
        Item: {
          id,
          ...data,
        },
      };
      const command = new PutCommand(params);
      console.log("savePlanet");

      await this.dynamoClient.send(command);
    }
  }
}

module.exports = PlanetsRepositoryServerless;
