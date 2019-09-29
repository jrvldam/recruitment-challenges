const path = require('path')
const fs = require('fs')
const util = require('util')
const assert = require('assert')
const { FraudRadar, Normalize } = require('./FraudRadar')

const readFile = util.promisify(fs.readFile)

describe('Fraud Radar', function () {
  it('Should process the one line file', async function () {
    const filePath = path.join(__dirname, 'Files', 'OneLineFile.txt')
    const fileContent = await readFile(filePath, 'utf8')
    const normalize = new Normalize()
    const fraudRadar = new FraudRadar(normalize)

    const result = fraudRadar.check(fileContent)
    assert.ok(result)
    assert.strictEqual(result.length, 0)
  })

  it('Should process the two line file in which the second is fraudulent', async function () {
    const filePath = path.join(__dirname, 'Files', 'TwoLines_FraudulentSecond.txt')
    const fileContent = await readFile(filePath, 'utf8')
    const normalize = new Normalize()
    const fraudRadar = new FraudRadar(normalize)

    const result = fraudRadar.check(fileContent)
    assert.ok(result)
    assert.strictEqual(result.length, 1)
    assert.strictEqual(result[0].isFraudulent, true)
    assert.strictEqual(result[0].orderId, 2)
  })

  it('Should process the three line file in which the second is fraudulent', async function () {
    const filePath = path.join(__dirname, 'Files', 'ThreeLines_FraudulentSecond.txt')
    const fileContent = await readFile(filePath, 'utf8')
    const normalize = new Normalize()
    const fraudRadar = new FraudRadar(normalize)

    const result = fraudRadar.check(fileContent)
    assert.ok(result)
    assert.strictEqual(result.length, 1)
    assert.strictEqual(result[0].isFraudulent, true)
    assert.strictEqual(result[0].orderId, 2)
  })

  it('Should process the four line file in which more than one order is fraudulent', async function () {
    const filePath = path.join(__dirname, 'Files', 'FourLines_MoreThanOneFraudulent.txt')
    const fileContent = await readFile(filePath, 'utf8')
    const normalize = new Normalize()
    const fraudRadar = new FraudRadar(normalize)

    const result = fraudRadar.check(fileContent)

    assert.ok(result)
    assert.strictEqual(result.length, 2)
  })
})
