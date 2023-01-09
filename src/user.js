const UserRepository = require('./repositories/user.repository')

UserRepository

class User {
  constructor() {
    this.users = []
    this.userRepository = new UserRepository()
  }

  async create(body) {
    const user = await this.userRepository.create(body)
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

    await this.userRepository.update(body, id)
  }
}

module.exports = new User()
