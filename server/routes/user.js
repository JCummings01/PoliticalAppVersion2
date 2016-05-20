var UserController = require('../controllers/user')

var userController = new UserController()

var userRoutes = function (app) {
  app.get('/get_state_members/:id', userController.getStateMembers)
  app.get('/get_member_bio/:candidate', userController.getMemberBio)
  app.get('/get_member_money/:candidate', userController.getMemberMoney)
  app.get('/get_member_votes/:uniqueId', userController.getMemberVotes)
}

module.exports = userRoutes
