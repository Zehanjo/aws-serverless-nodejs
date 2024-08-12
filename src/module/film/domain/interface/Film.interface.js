class FilmInterface {
    async fetchFilmFromSwapi(){
        throw new Error("Not Implemented");
    }
    async fetchFilm(){
        throw new Error("Not Implemented");
    }
    async saveFilm(data){
        throw new Error("Not Implemented");
    }
}

module.exports = FilmInterface;