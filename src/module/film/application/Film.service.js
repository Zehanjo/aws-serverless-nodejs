class FilmService {
  constructor(filmRepository) {
    this.filmRepositoryServerless = filmRepository;
  }

  async fetchFilm(endPointData) {
    return this.filmRepositoryServerless.fetchFilm(endPointData);
  }

  async fetchAndSaveFilm() {
    const Film = await this.filmRepositoryServerless.fetchFilmFromSwapi(); 
    for (const element of Film) {
    //   const dataElement = new FilmModel(element);
      await this.filmRepositoryServerless.saveFilm(element);
    }
  }
}
module.exports = FilmService;
