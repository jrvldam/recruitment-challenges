class FraudRadar {
  constructor (normalize) {
    this.normalize = normalize
    this.ORDER_SIZE = 8
    this.makeOrderFromLine = this.makeOrderFromLine.bind(this)
  }

  makeOrdersFromFileContent (fileContent) {
    return fileContent.split('\n').map(this.makeOrderFromLine)
  }

  makeOrderFromLine (line) {
    const items = line.split(',')

    if (items.length !== this.ORDER_SIZE) {
      throw new Error(`Insufficient items for an order. ${line}`)
    }

    return {
      orderId: Number(items[0]),
      dealId: Number(items[1]),
      email: this.normalize.email(items[2]),
      street: this.normalize.street(items[3]),
      city: items[4].toLowerCase(),
      state: this.normalize.state(items[5]),
      zipCode: items[6],
      creditCard: items[7]
    }
  }

  checkFraudulentOrder (current, next) {
    let isFraudulent = false

    if (current.dealId === next.dealId &&
      current.email === next.email &&
      current.creditCard !== next.creditCard) {
      isFraudulent = true
    }

    if (current.dealId === next.dealId &&
      current.state === next.state &&
      current.zipCode === next.zipCode &&
      current.street === next.street &&
      current.city === next.city &&
      current.creditCard !== next.creditCard) {
      isFraudulent = true
    }

    if (isFraudulent) {
      return {
        isFraudulent: true,
        orderId: next.orderId
      }
    }
  }

  check (fileContent) {
    const orders = this.makeOrdersFromFileContent(fileContent)
    const fraudResults = []

    for (let i = 0, len = orders.length; i < len; i++) {
      const current = orders[i]

      for (let j = i + 1; j < len; j++) {
        const fraudulentOrder = this.checkFraudulentOrder(current, orders[j])
        if (fraudulentOrder) {
          fraudResults.push(fraudulentOrder)
        }
      }
    }

    return fraudResults
  }
}

class Normalize {
  constructor () {
    this.emailRegex = (/^.{3,}@\w{2,}\.[a-z]{2,3}$/)
    this.STATES = {
      il: 'illinois',
      ca: 'california',
      ny: 'new york'
    }
  }

  email (email) {
    if (!this.emailRegex.test(email)) {
      throw new Error(`Invalid email format. ${email}`)
    }

    let [name, domain] = email.toLowerCase().split('@')

    name = name.replace('.', '')
    const atIndex = name.indexOf('+')

    if (atIndex !== -1) {
      name = name.substring(0, atIndex)
    }

    return `${name}@${domain}`
  }

  street (street) {
    return street
      .toLowerCase()
      .replace('st.', 'street')
      .replace('rd.', 'road')
  }

  state (state) {
    return this.STATES[state.toLowerCase()]
  }
}

module.exports = { FraudRadar, Normalize }
