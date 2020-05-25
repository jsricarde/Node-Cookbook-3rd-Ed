const from = require('from2')

function createInfiniteStream() {
  var stick = 0
  return from.obj((size, cb) => {
    setImmediate(() => cb(null, { tick: stick++ }))
  })
}

const stream = createInfiniteStream()

stream.on('data', (data) => {
  console.log(data)
})

stream.on('close', () => {
  console.log('(stream destroyed)')
})

setTimeout(() => {
  stream.destroy()
}, 2000)