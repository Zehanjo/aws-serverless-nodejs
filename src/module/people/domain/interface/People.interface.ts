import { PeopleModel } from "../model/People";

export abstract class PeopleInterface {
  abstract fetchPeopleFromSwapi(): Promise<any>;
  abstract fetchPeople(): Promise<PeopleModel[]>;
  abstract savePeople(data: any): Promise<void>;
}
