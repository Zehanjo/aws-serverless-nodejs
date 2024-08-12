import { FilmData } from "../model/Film";

export abstract class FilmInterface {
  abstract fetchFilmFromSwapi(): Promise<FilmData[]>;
  abstract fetchFilm(): Promise<any>;
  abstract saveFilm(data: FilmData): Promise<void>;
}
