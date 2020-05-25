const { Readable, Writable } = require('readable-stream')

const rs = Readable({
  read: () => {
    rs.push(Buffer.from('Hello world'))
    rs.push(null)
  }
})

const ws = Writable({
  write: (data, enc, cb) => {
    console.log(`Data written: ${data.toString()}`)
    cb()
  }
})

rs.pipe(ws)
