const Fabricator = require('../model/Fabricator.js')

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

    setupTestFabricators() {
        // id, description, hwid, model, name, date, devicePort
        this.fabricators.push(new Fabricator(1, 'a real life fabricator', 'hwid more like deez', '3d blaster 3000', 'cool', new Date(), '/dev/EMU'))
    }

    connectPrinter(id) {
        const printer = this.fabricators.find(fabricator => fabricator.id === id)

        console.log(printer.devicePort)

        printer.setupSerialPort()
    }
}

module.exports = FabricatorRepository