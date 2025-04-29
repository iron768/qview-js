import express from 'express'
import PrinterApi from './PrinterApi'

const app = express()

const printerApi = new PrinterApi(app)

printerApi.setupListener()