var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/app', express.static(__dirname + '/../client/app'))
app.use('/lib', express.static(__dirname + '/../bower_components'))

require('./routes/user')(app)
require('./routes/web')(app)

var port = process.env.PORT || 3003
var server = app.listen(port, function () {
  console.log('server is running on port ' + server.address().port)
})
