'use strict'
const fs = require('fs')
const rs = fs.createReadStream(__filename)

rs.on('data', (data) => {
  console.log('Read chunk:', data)
})

rs.pause()
setTimeout(() => rs.resume(), 10000)

rs.on('end', () => {
  console.log('No more data')
})

