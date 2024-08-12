import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { PeopleInterface } from "../domain/interface/People.interface";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { PeopleModel } from "../domain/model/People";

export class PeopleRepositoryServerless extends PeopleInterface {
  dynamoClient: DynamoDBDocumentClient;
  tableName: string;

  constructor(dynamoClient: DynamoDBDocumentClient) {
    super();
    this.dynamoClient = dynamoClient;
    this.tableName = "PeopleTable";
  }

  public async fetchPeopleFromSwapi(): Promise<any[]> {
    let data: any[] = [];
    let nextPageURL = "https://swapi.py4e.com/api/people/";

    while (nextPageURL) {
      try {
        const response = await axios.get(nextPageURL);
        const dataPage = response.data;

        data = data.concat(dataPage.results);

        nextPageURL = dataPage.next || null;
      } catch (error) {
        console.error("Error fetching data from SWAPI:", error);
        throw new Error("Failed to fetch People");
      }
    }

    return data;
  }

  public async fetchPeople(): Promise<PeopleModel[]> {
    console.log("fetchPeople");
    const data: PeopleModel[] = [];
    const params = { TableName: this.tableName };

    try {
      const command = new ScanCommand(params);
      const { Items } = await this.dynamoClient.send(command);
      if (Items) {
        Items.forEach((element) => {
          const dataElement = new PeopleModel(element as any);
          data.push(dataElement);
        });
      }
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch people from DynamoDB");
    }
  }

  public async savePeople(data: PeopleModel): Promise<void> {
    const id = uuidv4();
    const params = {
      TableName: this.tableName,
      Item: {
        id,
        ...data,
      },
    };
    console.log("result", params);
    const command = new PutCommand(params);
    await this.dynamoClient.send(command);
  }
}
