const { SerialPort } = require('serialport')
const EventEmitter = require('node:events')
const { MockBinding } = require('@serialport/binding-mock')

class Fabricator {

    constructor(id, description, hwid, model, name, date, devicePort) {
        this.id = id
        this.description = description
        this.hwid = hwid
        this.model = model
        this.name = name
        this.date = date
        this.devicePort = devicePort

        console.log(`[${this.devicePort}] Fabricator created`)

        this.events = new EventEmitter()
    }

    setupSerialPort(config = {}) {
        config.baudrate = 57600

        console.log(this.devicePort + ' ' + config.baudrate)

        if (this.devicePort === '/dev/EMU') {
            console.log("Mocking serial port")
            MockBinding.createPort('/dev/EMU', { echo: true, record: true })
            
            this.serialPort = new SerialPort( { binding: MockBinding, path: this.devicePort, baudRate: config.baudrate })
        } else {
            this.serialPort = new SerialPort( { path: this.devicePort, baudRate: config.baudrate })
        }

        this.serialPort.on('open', () => {
            console.log(`[${this.devicePort}] Serial port open`)
        })

        this.serialPort.on('data', (data) => {
            this.events.emit('data', data)

            console.log(`[${this.devicePort}] Data line: ${data}`)
        })

        this.serialPort.on('error', function(err) {
            console.log(`[${this.devicePort}] Error: ${err.message}`)
        })
    }

}

module.exports = Fabricator