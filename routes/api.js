const express = require('express');
const router = express.Router();
const notic = require('../controllers/notic')

require('dotenv').config()

const { body} = require('express-validator');
const validate = require('../src/validate/validate')

router.post('/send-notic',validate([
    body('email').isEmail(),
    body('name').isLength({ min: 1 }),
    body('subject').isLength({ min: 1 }),
    body('message').isLength({ min: 1 }),
    body('recaptcha_response').isLength({ min: 1 })
]), notic.sendNotic);


module.exports = router;