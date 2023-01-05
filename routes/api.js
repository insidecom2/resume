const express = require('express');
const router = express.Router();
const notic = require('../controllers/notic')
const { createAdmin } = require('../controllers/auth')

require('dotenv').config()

const { body} = require('express-validator');
const validate = require('../src/validate/validate');
const passport = require('passport');

router.post('/send-notic',validate([
    body('email').isEmail(),
    body('name').isLength({ min: 1 }),
    body('subject').isLength({ min: 1 }),
    body('message').isLength({ min: 1 }),
    body('recaptcha_response').isLength({ min: 1 })
]), notic.sendNotic);


router.post('/create-admin', validate([
    body('email').isEmail(),
    body('password').isLength({ min: 1 }),
    body('hash').isLength({ min: 1 })
]), createAdmin);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/backoffice/notify',
    failureRedirect: '/backoffice/login',
    failureMessage: true,
    failureFlash: true
}));

router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/backoffice/login')
    });
})

module.exports = router;