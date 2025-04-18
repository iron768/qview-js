const { SerialPortMock } = require('serialport')
const readline = require('readline')

const path = '/dev/EMU'

SerialPortMock.binding.createPort(path)

const serialport = new SerialPortMock({ path, baudRate: 57600 })

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Input: '
})

serialport.on('data', (data) => {
  console.log('Received data:', data.toString())
})

serialport.on('error', (err) => {
  console.error('Serial Port Error:', err.message)
})

rl.prompt()

rl.on('line', (line) => {
  const message = line.trim()

  if (message.toLowerCase() === 'exit') {
    rl.close()
    serialport.close()

    return
  }

  serialport.write(message, (err) => {
    if (err) {
      console.error('[EMU] Error on write:', err.message)
    } else {
      console.log('[EMU] Message sent:', message)
    }

    rl.prompt()
  })
})

rl.on('close', () => {
  console.log('Goodbye!')
  process.exit(0)
})
