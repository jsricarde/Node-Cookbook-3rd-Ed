const fs = require('fs')
const { execSync } = require('child_process')

const file = process.argv[2]

if (!file) {
  console.error('specify a file')
  process.exit(1)
}

try {
  fs.accessSync(file)
  console.error('file already exists')
  process.exit(1)
} catch (error) {
  makeIt()
}

function makeIt() {
  const nobody = Number(execSync('id -u nobody').toString().trim())
  const fd = fs.openSync(file, 'w')
  fs.chownSync(fd, nobody, nobody)
  fs.chmodSync(fd, 0)
  console.log(`${file} created!`)
}