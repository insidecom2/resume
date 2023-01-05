require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser')
const webRouter = require('./routes/web')
const apiRouter = require('./routes/api')
const initializePassport = require('./service/passport-config')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
initializePassport(passport)

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(flash());
app.use(session({
    secret: 'resume',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
// use res.render to load up an ejs view file

/// web ///
app.use("/", webRouter);
/// Api ////
app.use("/api", apiRouter);

app.listen(3000);
console.log('Server is listening on port http://localhost:3000');