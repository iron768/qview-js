class FabricatorRepository {

    constructor() {
        this.fabricators = []
    }
    
    getFabricators() {
        return this.fabricators
    }

    getFabricatorById(id) {
        return this.fabricators.find(fabricator => fabricator.id === id)
    }

    fabricatorExists(id) {
        return this.fabricators.some(fabricator => fabricator.id === id)
    }

    addFabricator(fabricator) {
        this.fabricators.push(fabricator)
    }

    removeFabricator(id) {
        this.fabricators = this.fabricators.filter(fabricator => fabricator.id !== id)
    }

}

module.exports = FabricatorRepository