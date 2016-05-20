var WebController = require('../controllers/web')

var webController = new WebController()

var webRoutes = function (app) {
  app.get('*', webController.index)
}

module.exports = webRoutes
