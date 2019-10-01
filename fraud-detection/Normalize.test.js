const Normalize = require('./Normalize')
const assert = require('assert')

describe('Normalize', function () {
  describe('Email', function () {
    it('should remove dots and all characters from + char', function () {
      const email = 'rabit.bugs+foo@bunny.com'
      const normalize = new Normalize()

      const normalizedEmail = normalize.email(email)
      assert.strictEqual(normalizedEmail, 'rabitbugs@bunny.com')
    })

    it('should throw error if email user name less than length 3', function () {
      const email = 'me@test.com'
      const normalize = new Normalize()

      assert.throws(
        () => normalize.email(email),
        (error) => error.message === `Invalid email format. ${email}`
      )
    })
  })

  describe('Street', function () {
    it('should return "street"', function () {
      const roadType = 'St.'
      const normalize = new Normalize()

      const normalizedRoadType = normalize.street(roadType)
      assert.deepStrictEqual(normalizedRoadType, 'street')
    })
  })

  describe('State', function () {
    it('should return "illinois"', function () {
      const state = 'il'
      const normalize = new Normalize()

      const normalizedState = normalize.state(state)
      assert.deepStrictEqual(normalizedState, 'illinois')
    })

    it('should invalid state throw error', function () {
      const state = 'tx'
      const normalize = new Normalize()

      assert.throws(
        () => normalize.state(state),
        (error) => error.message === 'Invalid state.'
      )
    })
  })
})
