var UserController = require('../controllers/user')

var userController = new UserController()

var userRoutes = function (app) {
  app.get('/get_state_members/:id', userController.getStateMembers)
  app.get('/get_member_bio/:candidate', userController.getMemberBio)
  app.get('/get_member_money/:candidate', userController.getMemberMoney)
  app.get('/get_member_votes/:uniqueId', userController.getMemberVotes)
// app.post('/api/v1/desktop/user/findOrCreate', userController.findOrCreate)
// app.post('/api/v1/desktop/user/tokenCheck', userController.tokenCheck)
// app.get('/products/:userId', userController.getProducts) // get User order data from WooCommerce
}

module.exports = userRoutes
