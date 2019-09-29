function Count (input) {
  if (!Number.isInteger(input) || input < 0) {
    throw new RangeError('Only unsigned integers allowed')
  }

  return input
    .toString(2)
    .split('')
    .reverse()
    .reduce((acc, val, index) => {
      if (val === '1') {
        acc[0]++
        acc.push(index)
      }
      return acc
    }, [0])
}

module.exports = { Count }
