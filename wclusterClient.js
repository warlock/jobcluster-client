const socket = require('socket.io-client')('http://localhost:3000')
const os = require('os')
var life

socket.on('connect', () => {
  console.log('Ja estic conectat')
  socket.emit('new', {
    hostname: os.hostname(),
    pid: process.pid,
    uptime: Math.trunc(process.uptime()),
    totalmem: os.totalmem(),
    freemem: os.freemem()
  })

  life = setInterval(() => {
    socket.emit('life', {
      uptime: Math.trunc(process.uptime()),
      totalmem: os.totalmem(),
      freemem: os.freemem()
    })
  }, 5000)
})

socket.on('job', data => {
  console.log(`job: ${JSON.stringify(data)}`)
})

socket.on('disconnect', () => {
  clearInterval(life)
  console.log('Servidor desconectat??')
})
