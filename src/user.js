const UserRepository = require('./repositories/user.repository')
const { createHmac } = require('crypto')

UserRepository

class User {
  constructor() {
    this.users = []
    this.userRepository = new UserRepository()
  }

  async create(body) {
    const { password } = body
    const pwdEncrypted = createHmac('sha256', password).digest('hex')

    const userTemp = {
      ...body,
      password: pwdEncrypted
    }

    const user = await this.userRepository.create(userTemp)
    return user
  }

  async findAll() {
    const user = await this.userRepository.findAll()
    return user
  }

  async update(body, id) {
    const userExists = await this.userRepository.findById(id)

    if (!userExists) {
      throw new Error('User not found! Try again.')
    }

    const { password } = body
    const pwdEncrypted = createHmac('sha256', password).digest('hex')

    const user = {
      ...body,
      password: pwdEncrypted
    }

    await this.userRepository.update(user, id)
  }
}

module.exports = new User()
