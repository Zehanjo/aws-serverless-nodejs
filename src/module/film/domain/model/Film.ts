export interface FilmData {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export class FilmModel {
  titulo: string;
  episodio_id: number;
  texto_apertura: string;
  director: string;
  productor: string;
  fecha_de_lanzamiento: string;
  personajes: string[];
  planetas: string[];
  naves_espaciales: string[];
  vehiculos: string[];
  especies: string[];
  creado: string;
  editado: string;
  url: string;

  constructor({
    title,
    episode_id,
    opening_crawl,
    director,
    producer,
    release_date,
    characters,
    planets,
    starships,
    vehicles,
    species,
    created,
    edited,
    url,
  }: FilmData) {
    this.titulo = title;
    this.episodio_id = episode_id;
    this.texto_apertura = opening_crawl;
    this.director = director;
    this.productor = producer;
    this.fecha_de_lanzamiento = release_date;
    this.personajes = characters;
    this.planetas = planets;
    this.naves_espaciales = starships;
    this.vehiculos = vehicles;
    this.especies = species;
    this.creado = created;
    this.editado = edited;
    this.url = url;
  }
}
