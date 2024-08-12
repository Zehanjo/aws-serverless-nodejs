class PlanetModel{
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
        url,
        ...rest
    }){
        this.nombre = name,
        this.periodo_de_rotacion = rotation_period,
        this.periodo_orbital = orbital_period,
        this.diametro = diameter,
        this.clima = climate,
        this.gravedad = gravity,
        this.terreno = terrain,
        this.superficie_agua = surface_water,
        this.poblacion = population,
        this.residentes = residents,
        this.peliculas = films,
        this.creado = created,
        this.editado = edited,
        this.url = url,
        Object.assign(this, rest)
    }
}

module.exports = PlanetModel;