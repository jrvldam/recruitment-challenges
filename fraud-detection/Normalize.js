module.exports = class Normalize {
  constructor () {
    this.emailRegex = (/^.{3,}@\w{2,}\.[a-z]{2,3}$/)
    this.STATES = {
      il: 'illinois',
      ca: 'california',
      ny: 'new york',
      cl: 'colorado'
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
    const normalizedState = this.STATES[state.toLowerCase()]

    if (normalizedState) {
      return normalizedState
    }

    throw new Error('Invalid state.')
  }
}
