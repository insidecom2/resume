const notic = require("./service/sendnotic");
require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');

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
app.get('/', function (req, res) {
  const endPoint = process.env.END_POINT;
  res.render('pages/index', { endPoint: endPoint });
});

// about page
app.post('/send-notic',
  body('email').isEmail(),
  body('name').isLength({ min: 1 }),
  body('subject').isLength({ min: 1 }),
  body('message').isLength({ min: 1 }),
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const response = await notic.sendNotic(req.body)
      res.json(response)

    } catch (error) {
      res.json({ status: false })
    }
  });

app.listen(3000);
console.log('Server is listening on port http://localhost:3000');