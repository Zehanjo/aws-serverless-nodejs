import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { FilmInterface } from "../domain/interface/Film.interface";
import { FilmModel } from "../domain/model/Film";

interface DynamoDBClient {
  send(command: any): Promise<any>;
}

class FilmRepositoryServerless extends FilmInterface {
  private dynamoClient: DynamoDBClient;
  private tableName: string;

  constructor(dynamoClient: DynamoDBClient) {
    super();
    this.dynamoClient = dynamoClient;
    this.tableName = "FilmTable";
  }

  async fetchFilmFromSwapi(): Promise<any[]> {
    let data: any[] = [];
    let nextPageURL = "https://swapi.py4e.com/api/films/";

    while (nextPageURL) {
      try {
        const response = await axios.get(nextPageURL);
        const dataPage = response.data;

        data = data.concat(dataPage.results);

        nextPageURL = dataPage.next;

        console.log("Next page URL:", nextPageURL);
      } catch (error) {
        console.error("Error fetching data from SWAPI:", error);
        throw new Error("Failed to fetch Film");
      }
    }

    return data;
  }

  async fetchFilm(): Promise<FilmModel[]> {
    console.log("fetchFilm");
    const data: FilmModel[] = [];
    const params = { TableName: this.tableName };
    try {
      const command = new ScanCommand(params);
      const { Items } = await this.dynamoClient.send(command);
      if (Items) {
        Items.forEach((element: any) => {
          const dataElement = new FilmModel(element);
          data.push(dataElement);
        });
      }
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch films");
    }
  }

  async saveFilm(data: any): Promise<void> {
    const id = uuidv4();
    const params = {
      TableName: this.tableName,
      Item: {
        id,
        ...data,
      },
    };
    const command = new PutCommand(params);
    await this.dynamoClient.send(command);
  }
}

export default FilmRepositoryServerless;
