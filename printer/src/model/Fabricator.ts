import { SerialPort } from 'serialport'
import EventEmitter from 'events'
import { MockBinding } from '@serialport/binding-mock'

interface SerialPortConfig {
    baudrate?: number
    [key: string]: any
}

interface SerialPortOptions {
    path: string
    baudRate: number
    binding?: any
    [key: string]: any
}

class Fabricator {
    id: number
    description: string
    hwid: string
    model: string
    name: string
    date: string
    devicePort: string
    events: EventEmitter
    serialPort?: SerialPort

    constructor(
        id: number, 
        description: string, 
        hwid: string, 
        model: string, 
        name: string, 
        date: string, 
        devicePort: string
    ) {
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

    setupSerialPort(config: SerialPortConfig = {}): void {
        config.baudrate = 57600

        console.log(this.devicePort + ' ' + config.baudrate)

        if (this.devicePort === '/dev/EMU') {
            console.log("Mocking serial port")
            MockBinding.createPort('/dev/EMU', { echo: true, record: true })
        
            this.serialPort = new SerialPort({ 
                binding: MockBinding, 
                path: this.devicePort, 
                baudRate: config.baudrate 
            } as SerialPortOptions)
        } else {
            this.serialPort = new SerialPort({ 
                path: this.devicePort, 
                baudRate: config.baudrate 
            } as SerialPortOptions)
        }

        this.serialPort.on('open', () => {
            console.log(`[${this.devicePort}] Serial port open`)
        })

        this.serialPort.on('data', (data) => {
            this.events.emit('data', data)
            console.log(`[${this.devicePort}] Data line: ${data}`)
        })

        const devicePort = this.devicePort
        this.serialPort.on('error', function(err) {
            console.log(`[${devicePort}] Error: ${err.message}`)
        })
    }
}

export default Fabricator