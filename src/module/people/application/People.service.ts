import { PeopleRepositoryServerless } from "../infraestructure/People.repository";
import { PeopleModel } from "../domain/model/People";

export class PeopleService {
  private peopleRepositoryServerless: PeopleRepositoryServerless;

  constructor(peopleRepository: PeopleRepositoryServerless) {
    this.peopleRepositoryServerless = peopleRepository;
  }

  async fetchPeople(): Promise<PeopleModel[]> {
    return this.peopleRepositoryServerless.fetchPeople();
  }

  async fetchAndSavePeople(): Promise<void> {
    const people = await this.peopleRepositoryServerless.fetchPeopleFromSwapi();
    for (const element of people) {
      await this.peopleRepositoryServerless.savePeople(element);
    }
  }
}
