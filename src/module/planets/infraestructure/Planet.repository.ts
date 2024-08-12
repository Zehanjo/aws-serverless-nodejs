import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { PlanetsInterface } from "../domain/interface/Planet.interface";
import { PlanetData, PlanetModel } from "../domain/model/Planet";

class PlanetsRepositoryServerless extends PlanetsInterface {

  private dynamoClient: DynamoDBDocumentClient;
  private tableName: string;

  constructor(dynamoClient: DynamoDBDocumentClient) {
    super();
    this.dynamoClient = dynamoClient;
    this.tableName = "PlanetsTable";
  }

  async fetchPlanetsFromSwapi(): Promise<PlanetData[]> {
    let data: PlanetData[] = [];
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

  async fetchPlanets(): Promise<PlanetModel[]> {
    const data: PlanetModel[] = [];
    const params = { TableName: this.tableName };
    try {
      const command = new ScanCommand(params);
      const { Items } = await this.dynamoClient.send(command);
      if (Items) {
        Items.forEach((element:any) => {
          const dataElement = new PlanetModel(element);
          data.push(dataElement);
        });
      }
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch planets from DynamoDB");
    }
  }

  async savePlanet(data: PlanetData): Promise<void> {
    if (data) {
      const id = uuidv4();
      const params = {
        TableName: this.tableName,
        Item: {
          id,
          ...data,
        },
      };
      const command = new PutCommand(params);
      console.log("savePlanet");

      try {
        await this.dynamoClient.send(command);
      } catch (error) {
        console.error("Error saving planet to DynamoDB:", error);
        throw new Error("Failed to save planet");
      }
    }
  }
}

export default PlanetsRepositoryServerless;
