const express = require('express');
const router = express.Router();
const notic = require('../controllers/notic')
const { createAdmin } = require('../controllers/auth')
const { deleteNotify } = require('../controllers/notic')
const { checkApiAuthenticated } = require('../middleware/middleware')

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

/**
 * Notify
 */
router.delete('/notify/:id', checkApiAuthenticated, async (req, res) => {
    const id = req.params.id;
    const result = await deleteNotify(req.params.id);
    if (typeof result === 'string') {
        return res.status(400).json({ status: false, message: result})
    }
    res.status(200).json({ status: true, message: 'deleted'})
})
module.exports = router;