var toRgb = require('hsl-to-rgb-for-reals')
var debug = require('debug')('hsl-to-hex')

function max(val, n) {
  debug('ensuring ' + val + 'is no more than ' + n)
  return (val > n) ? n : val
}

function min(val, n) {
  debug('ensuring ' + val + 'is no less than ' + n)
  return (val < n) ? n : val
}

function cycle(val) {
  debug('resolving ' + val + ' within the 0-359 range')
  // for safety:
  val = max(val, 1e7)
  val = min(val, -1e7)
  // cycle value:
  while (val < 0) { val += 360 }
  while (val > 359) { val -= 360 }
  return val
}

function hsl(hue, saturation, luminosity) {
  // resolve degrees to 0 - 359 range
  hue = cycle(hue)

  // enforce constraints
  saturation = min(max(saturation, 100), 0)
  luminosity = min(max(luminosity, 100), 0)

  // convert to 0 to 1 range used by hsl-to-rgb-for-reals
  saturation /= 100
  luminosity /= 100

  // let hsl-to-rgb-for-reals do the hard work
  var rgb = toRgb(hue, saturation, luminosity)

  // convert each value in the returned RGB array
  // to a 2 character hex value, join the array into
  // a string, prefixed with a hash
  return '#' + rgb
    .map(function (n) {
      return (256 + n).toString(16).substr(-2)
    })
    .join('')
}

module.exports = hsl