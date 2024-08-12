export interface PlanetData {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export class PlanetModel {
  public nombre: string;
  public periodo_de_rotacion: string;
  public periodo_orbital: string;
  public diametro: string;
  public clima: string;
  public gravedad: string;
  public terreno: string;
  public superficie_agua: string;
  public poblacion: string;
  public residentes: string[];
  public peliculas: string[];
  public creado: string;
  public editado: string;
  public url: string;

  constructor({
    name,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
    population,
    residents,
    films,
    created,
    edited,
    url
  }: PlanetData) {
    this.nombre = name;
    this.periodo_de_rotacion = rotation_period;
    this.periodo_orbital = orbital_period;
    this.diametro = diameter;
    this.clima = climate;
    this.gravedad = gravity;
    this.terreno = terrain;
    this.superficie_agua = surface_water;
    this.poblacion = population;
    this.residentes = residents;
    this.peliculas = films;
    this.creado = created;
    this.editado = edited;
    this.url = url;
  }
}
