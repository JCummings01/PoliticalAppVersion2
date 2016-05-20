var WebController = function () {}

WebController.prototype.index = function (req, res) {
  var options = {
    maxAge: 10000,
    root: 'client',
    dotfiles: 'deny'
  }

  res.sendFile('index.html', options, function (err) {
    if (err) {
      console.log('Error serving up index.html file.')
      console.log(err)
      return res.status(err.status).send(err)
    }
  })

}

module.exports = WebController
