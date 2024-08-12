export class PeopleModel {
  public nombre: string;
  public altura: string;
  public masa: string;
  public color_pelo: string;
  public color_piel: string;
  public color_ojos: string;
  public anio_nacimiento: string;
  public genero: string;
  public mundo_natal: string;
  public peliculas: string[];
  public especie: string[];
  public vehiculos: string[];
  public naves_espaciales: string[];
  public creado: string;
  public editado: string;
  public url: string;

  constructor({
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    homeworld,
    films,
    species,
    vehicles,
    starships,
    created,
    edited,
    url,
  }: {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
  }) {
    this.nombre = name;
    this.altura = height;
    this.masa = mass;
    this.color_pelo = hair_color;
    this.color_piel = skin_color;
    this.color_ojos = eye_color;
    this.anio_nacimiento = birth_year;
    this.genero = gender;
    this.mundo_natal = homeworld;
    this.peliculas = films;
    this.especie = species;
    this.vehiculos = vehicles;
    this.naves_espaciales = starships;
    this.creado = created;
    this.editado = edited;
    this.url = url;
  }
}
