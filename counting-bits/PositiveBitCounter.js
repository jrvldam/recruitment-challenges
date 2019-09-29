function Count (input) {
  if (!Number.isSafeInteger(input) || input < 0) {
    throw new RangeError('Only unsigned integers allowed')
  }

  let nextPosition = 1
  let counter = 0
  const response = [counter]

  const bitsStr = input.toString(2)
  const lastPosition = bitsStr.length - 1

  for (let i = lastPosition; i >= 0; i--) {
    if (bitsStr[i] === '1') {
      counter++
      response[nextPosition++] = lastPosition - i
    }
  }

  response[0] = counter

  return response
}

module.exports = { Count }
