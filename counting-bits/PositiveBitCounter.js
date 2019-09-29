function Count (input) {
  if (!Number.isInteger(input) || input < 0) {
    throw new RangeError('Only unsigned integers allowed')
  }

  let counter = 0
  let newPosition = 1
  const response = [counter]

  const bits = input.toString(2).split('')
  const lastPosition = bits.length - 1

  for (let i = lastPosition; i >= 0; --i) {
    if (bits[i] === '1') {
      counter++
      response[newPosition++] = lastPosition - i
    }
  }
  response[0] = counter

  return response
}

module.exports = { Count }
