const express = require('express')
const PrinterApi = require('./PrinterApi.js')

const app = express()

const printerApi = new PrinterApi(app)

printerApi.setupListener()