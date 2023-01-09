const UserController = require("./controllers/user.controller")

const useController = new UserController()

const router  = [
  {
    url:'/users',
    method: 'get',
    controller: useController.get,
  },
  {
    url:'/users',
    method: 'post',
    controller: useController.post,
  },
  {
    url:'/users/:id',
    method: 'put',
    controller: useController.put,
  }
]

module.exports = router