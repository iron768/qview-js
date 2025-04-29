import express, { Request, Response, NextFunction, Router } from 'express'
import PrinterApi from '../PrinterApi'

class FabricatorController {
    
    private printerApi: PrinterApi
    private router: Router

    constructor(printerApi: PrinterApi) {
        this.printerApi = printerApi
        this.router = express.Router()

        this.setupRouters()
    }

    setupRouters(): void {
        this.router.get('/', this.getAllFabricators.bind(this))
        this.router.get('/:id', this.getFabricatorById.bind(this))
        this.router.put('/:id', this.connectPrinter.bind(this))
    }

    getAllFabricators(request: Request, response: Response, next: NextFunction): void {
        const result = {
            status: 'success',
            data: this.printerApi.fabricatorRepository.getFabricators()
        }

        response.send(result)
    }

    getFabricatorById(request: Request, response: Response, next: NextFunction): void {
        const fabricatorId = +request.params.id

        if (!fabricatorId) {
            const result = {
                status: 'error',
                data: 'No fabricator id provided'
            }
    
            response.send(result)
            return
        }

        const fabricator = this.printerApi.fabricatorRepository.getFabricatorById(fabricatorId)

        if (!fabricator) {
            const result = {
                status: 'error',
                data: 'Fabricator not found'
            }
    
            response.send(result)
            return
        }

        const result = {
            status: 'success',
            data: fabricator
        }

        response.send(result)
    }

    connectPrinter(request: Request, response: Response, next: NextFunction): void {
        const fabricatorId = +request.params.id

        if (!fabricatorId) {
            const result = {
                status: 'error',
                data: 'No fabricator id provided'
            }
    
            response.send(result)
            return
        }

        const connected = this.printerApi.fabricatorRepository.connectPrinter(fabricatorId)
        
        if (!connected) {
            const result = {
                status: 'error',
                data: 'Failed to connect printer'
            }
    
            response.send(result)
            return
        }

        const result = {
            status: 'success',
            data: 'Printer connected'
        }

        response.send(result)
    }

    getRouter(): Router {
        return this.router
    }
}

export default FabricatorController