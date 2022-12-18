const notic = require("./service/sendnotic");

var express = require('express');
var bodyParser = require('body-parser')

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

// about page
app.post('/send-notic', async function (req, res) {
  try {
    const response = await notic.sendNotic(req.body)
    res.json(response)
    
  } catch (error) {
    res.json({ status: false})
  }
});

app.listen(3000);
console.log('Server is listening on port http://localhost:3000');