import { FilmModel } from "../domain/model/Film";
import FilmRepositoryServerless from "../infraestructure/Film.repository";

export class FilmService {
  private filmRepositoryServerless: FilmRepositoryServerless;

  constructor(filmRepository: FilmRepositoryServerless) {
    this.filmRepositoryServerless = filmRepository;
  }

  async fetchFilm(): Promise<FilmModel[]> {
    return this.filmRepositoryServerless.fetchFilm();
  }

  async fetchAndSaveFilm(): Promise<void> {
    const films = await this.filmRepositoryServerless.fetchFilmFromSwapi();
    for (const element of films) {
      const filmModel = new FilmModel(element);
      await this.filmRepositoryServerless.saveFilm(filmModel);
    }
  }
}
