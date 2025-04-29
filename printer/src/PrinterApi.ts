import express, { Express } from 'express'
import FabricatorRepository from './repository/FabricatorRepository'
import FabricatorController from './controller/FabricatorController'

const PORT = 3000

class PrinterApi {
    private express: Express
    fabricatorRepository: FabricatorRepository
    private fabricatorController: FabricatorController

    constructor(expressApp: Express) {
        this.express = expressApp

        this.setupBasicRoute()

        // setup printer api managers/repositories
        this.fabricatorRepository = new FabricatorRepository()
        
        // pass controller file this class
        this.fabricatorController = new FabricatorController(this)

        this.setupControllerRoutes()

        this.fabricatorRepository.setupTestFabricators()
    }

    getExpressInstance(): Express {
        return this.express
    }

    setupBasicRoute(): void {
        this.express.get('/', (req, res) => {
            res.send('Hello World!')
        })
    }

    setupControllerRoutes(): void {
        this.express.use('/api/v2/fabricators', this.fabricatorController.getRouter())
    }

    setupListener(): void {
        this.express.listen(PORT, () => {
            console.log(`QView Printer API is now listening on port ${PORT}`)
        })
    }
}

export default PrinterApi