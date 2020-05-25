const from = require('from2')
const to = require('to2')

const rs = from(() => {
  rs.push(Buffer.from('Hello, world'))
  rs.push(null)
})

// rs.on('data', (data) => {
//   console.log(data.toString())
// })

const ws = to((data, enc, cb) => {
  console.log(`Data wrinting: ${data.toString()}`)
  cb()
})

rs.pipe(ws)
