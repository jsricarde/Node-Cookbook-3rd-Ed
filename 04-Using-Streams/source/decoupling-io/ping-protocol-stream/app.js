const through = require('through2')
const split = require('split2')
const pumpify = require('pumpify')

function pingProtocol() {
  const ping = /Ping:\s+(.*)/
  const protocol = through(each)

  function each(line, enc, cb) {
    if (ping.test(line)) {
      cb(null, `Pong: ${line.toString().match(ping)[1]}\n`)
      return
    }
    cb(null, 'Not implemented')
  }
  return pumpify(split(), protocol)
}

module.exports = pingProtocol