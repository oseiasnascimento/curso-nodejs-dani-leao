const user = require('../user')

class UserController {
  async post(req, res) {
    const { body } = req
    const result = await user.create(req.body)
    return res.end(JSON.stringify(result))
  }

  async get(req, res) {
    const result = await user.findAll()
    return res.end(JSON.stringify(result))
  }

  async put(req, res) {
    const { id } = req.params
    const { body } = req

    console.log(req.params)
    
    try {
      await user.update(body, id)
      return res.end('Updated user successfully')
    } catch (error) {
      return res.end(`${error.message}`)
    }
  }
}

module.exports = UserController
