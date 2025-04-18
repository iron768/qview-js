const express = require('express');

class FabricatorController {

    constructor(printerApi) {
        this.printerApi = printerApi
        this.router = express.Router()

        this.setupRouters()
    }

    setupRouters() {
        this.router.get('/', this.getAllFabricators.bind(this))
        this.router.get('/:id', this.getFabricatorById.bind(this))
    }

    getAllFabricators(request, response, next) {
        const result = {
            status: 'success',
            data: this.printerApi.fabricatorRepository.getFabricators()
        }

        response.send(result)

        return
    }

    getFabricatorById(request, response, next) {
        const fabricatorId = request.params.id

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

    getRouter() {
        return this.router
    }

}

module.exports = FabricatorController