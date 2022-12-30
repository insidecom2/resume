const notic = require("./service/sendnotic");
const captcha = require("./service/captcha");
require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser')
const axios = require('axios');
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
  res.render('pages/index');
});

// about page
app.post('/send-notic',
  body('email').isEmail(),
  body('name').isLength({ min: 1 }),
  body('subject').isLength({ min: 1 }),
  body('message').isLength({ min: 1 }),
  body('recaptcha_response').isLength({ min: 1 }),
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // check google captcha
    const isPassGoogleCaptcha = captcha.checkGoogleCaptcha(req.body.recaptcha_response);

    if (!isPassGoogleCaptcha) {
      return res.json({ status: false })
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