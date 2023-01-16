const router = require('./routes')

const handler = (req, res) => {
  const method = req.method
  const url = req.url

  const urlSplit = url.split('/').filter(Boolean)

  const resultRouter = router.filter(item => {
    return (
      item.method.toLocaleLowerCase() === method.toLocaleLowerCase() &&
      item.url
        .toLocaleLowerCase()
        .startsWith(`/${urlSplit[0].toLocaleLowerCase()}`)
    )
  })

  const executeRouter = resultRouter.find(item => {
    const routerUrlSplit = item.url.split('/').filter(Boolean)
    return urlSplit.length === routerUrlSplit.length
  })

  if (!executeRouter) {
    res.statusCode = 404
    return res.end('Not Found!')
  }

  const routerSplitUrl = executeRouter.url.split('/').filter(Boolean)

  const objParams = {}

  routerSplitUrl.forEach((item, index) => {
    if (item.startsWith(':')) {
      const formatField = item.replace(':', '')
      objParams[formatField] = urlSplit[index]
    }
  })

  req.params = objParams

  return executeRouter.controller(req, res)
}

module.exports = handler
