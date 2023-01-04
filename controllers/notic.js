const notic = require("../service/sendnotic");
const captcha = require("../service/captcha");
const { PrismaClient } = require('@prisma/client')

const saveNotify = async (body) => {
    const prisma = new PrismaClient()
    const newNotic = await prisma.notify.create({
        data: {
            name: body.name,
            email: body.email,
            subject: body.subject,
            message: body.message
        },
    })
    return newNotic;
}

function listNotify(req, res) {

}

const sendNotic = async (req, res) => {
    // check google captcha
    const isPassGoogleCaptcha = captcha.checkGoogleCaptcha(req.body.recaptcha_response);

    if (!isPassGoogleCaptcha) {
        return res.json({ status: false })
    }

    try {
        const response = await notic.sendNotic(req.body)
        return res.json(response)

    } catch (error) {
        return res.json({ status: false , message: error})
    }
}

module.exports = { saveNotify, listNotify, sendNotic };