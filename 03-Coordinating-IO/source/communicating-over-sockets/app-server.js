const net = require('net')

net.createServer((socket) => {
  console.log('=> Client connected')
  socket.on('data', name => {
    socket.write(`Hi papu ${name}`)
  })
  socket.on('close', () => {
    console.log('=> Client disconnected')

  })
}).listen(1337, 'localhost')