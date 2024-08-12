const { ScanCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
const PeopleInterface = require("../domain/interface/People.interface");
const { v4 } = require("uuid");
const axios = require("axios");
const { PeopleModel } = require("../domain/model/People");

class PeopleRepositoryServerless extends PeopleInterface {
  constructor(dynamoClient) {
    super();
    this.dynamoClient = dynamoClient;
    this.tableName = "PeopleTable";
  }

  async fetchPeopleFromSwapi() {
    let data = [];
    let nextPageURL = "https://swapi.py4e.com/api/films/";

    while (nextPageURL) {
      try {
        const response = await axios.get(nextPageURL);
        const dataPage = response.data;

        data = data.concat(dataPage.results);

        nextPageURL = dataPage.next;
      } catch (error) {
        console.error("Error fetching data from SWAPI:", error);
        throw new Error("Failed to fetch People");
      }
    }

    return data;
  }

  async fetchPeople() {
    console.log("fetchPeople");
    const data = [];
    const params = { TableName: this.tableName };
    try {
      const command = new ScanCommand(params);
      const { Items } = await this.dynamoClient.send(command);
      Items.forEach((element) => {
        const dataElement = new PeopleModel(element);
        data.push(dataElement);
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async savePeople(data) {
    const id = v4();
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

module.exports = PeopleRepositoryServerless;
