class PeopleInterface {
    async fetchPeopleFromSwapi(){
        throw new Error("Not Implemented");
    }
    async fetchPeople(){
        throw new Error("Not Implemented");
    }
    async savePeople(data){
        throw new Error("Not Implemented");
    }
}

module.exports = PeopleInterface;