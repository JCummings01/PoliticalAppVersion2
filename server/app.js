var express = require('express')
// var morgan = require('morgan')
var bodyParser = require('body-parser')
// var methodOverride = require('method-override')
// var cookieParser = require('cookie-parser')
// var session = require('express-session')
// var flash = require('express-flash')
// var passport = require('passport')
// var LocalStrategy = require('passport-local').Strategy
// var mongoose = require('mongoose')
// var AWS = require('aws-sdk')
// var async = require('async')
// var CronJob = require('cron').CronJob

// mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/output')

var app = express()

// app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/app', express.static(__dirname + '/../client/app'))
app.use('/lib', express.static(__dirname + '/../bower_components'))
// Required for Passport
// app.use(session({ secret: 'PoliticalApp' }))
// app.use(methodOverride())
// app.use(cookieParser())
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(flash())

require('./routes/user')(app)
// require('./routes/auth')(app, passport)
// require('./config/passport')(passport)
require('./routes/web')(app)
// require('./config/cronjob')(app);  //Cronjob to get product list from AWS, daily

var port = process.env.PORT || 3003
var server = app.listen(port, function () {
  console.log('server is running on port ' + server.address().port)
})
