const { ScanCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { FilmModel } = require("../domain/model/Film");
const FilmInterface = require("../domain/interface/Film.interface")
const { v4 } = require("uuid");
const axios = require("axios");

class FilmRepositoryServerless extends FilmInterface {
  constructor(dynamoClient) {
    super();
    this.dynamoClient = dynamoClient;
    this.tableName = "FilmTable";
  }

  async fetchFilmFromSwapi() {
    let data = [];
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

  async fetchFilm() {
    console.log("fetchFilm");
    const data = [];
    const params = { TableName: this.tableName };
    try {
      const command = new ScanCommand(params);
      const { Items } = await this.dynamoClient.send(command);
      Items.forEach((element) => {
        const dataElement = new FilmModel(element);
        data.push(dataElement);
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async saveFilm(data) {
    const id = v4();
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

module.exports = FilmRepositoryServerless;
