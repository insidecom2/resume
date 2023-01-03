require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser')
const webRouter = require('./routes/web')
const apiRouter = require('./routes/api')

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
// use res.render to load up an ejs view file

/// web ///
app.use("/", webRouter);
/// Api ////
app.use("/api", apiRouter);

app.listen(3000);
console.log('Server is listening on port http://localhost:3000');