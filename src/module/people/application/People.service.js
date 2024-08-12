class PeopleService {
  constructor(peopleRepository) {
    this.peopleRepositoryServerless = peopleRepository;
  }

  async fetchPeople(endPointData) {
    return this.peopleRepositoryServerless.fetchPeople(endPointData);
  }

  async fetchAndSavePeople() {
    const People = await this.peopleRepositoryServerless.fetchPeopleFromSwapi(); 
    for (const element of People) {
      await this.peopleRepositoryServerless.savePeople(element);
    }
  }
}
module.exports = PeopleService;
