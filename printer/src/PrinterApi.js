const FabricatorRepository = require('./repository/FabricatorRepository.js')
const FabricatorController = require('./controller/FabricatorController.js')

const PORT = 3000

class PrinterApi {

    constructor(express) {
        this.express = express

        this.setupBasicRoute()

        // setup printer api managers/repositories
        this.fabricatorRepository = new FabricatorRepository()
        
        // somehow pass controller file this class
        this.fabricatorController = new FabricatorController(this)

        this.setupControllerRoutes()

        this.fabricatorRepository.setupTestFabricators()
    }

    getExpressInstance() {
        return this.express
    }

    setupBasicRoute() {
        this.express.get('/', (req, res) => {
            res.send('Hello World!')
        })
    }

    setupControllerRoutes() {
        this.express.use('/api/v2/fabricators', this.fabricatorController.getRouter())
    }

    setupListener() {
        this.express.listen(PORT, () => {
            console.log(`QView Printer API is now listening on port ${PORT}`)
        })
    }

}

module.exports = PrinterApi