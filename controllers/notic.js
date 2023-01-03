const notic = require("../service/sendnotic");
const captcha = require("../service/captcha");

const { validationResult } = require('express-validator');

function saveNotify(req, res) {

}

function listNotify(req, res) {
    
}

const sendNotic = async (req, res) => {
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
        return res.json(response)

    } catch (error) {
        return res.json({ status: false })
    }
}

module.exports = { saveNotify, listNotify, sendNotic};