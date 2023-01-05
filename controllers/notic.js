const notic = require("../service/sendnotic");
const captcha = require("../service/captcha");
const conn = require('../database/connect');

const saveNotify = async (body) => {
    try {
        return await conn.query(`INSERT INTO Notify SET name='${body.name}', 
        email='${body.email}', 
        subject='${body.subject}', 
        message='${body.message}'`);
    } catch (error) {
        return null
    }
    
  
}

/**
 * listNotify
 * @param {*} page 
 * @param {*} limit 
 * @returns 
 */
const listNotify = async (page, limit = 10) => {
    try {
        const start = (page * limit) - limit;
        const result = await conn.query(`SELECT * FROM Notify ORDER BY id DESC LIMIT ${start},${limit} `);
        return conn.fetch(result);        
    } catch (error) {
        console.log('error',error);
        return null;
    }
}

/**
 * sendNotic
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const sendNotic = async (req, res) => {
    // check google captcha
    const isPassGoogleCaptcha = captcha.checkGoogleCaptcha(req.body.recaptcha_response);

    if (!isPassGoogleCaptcha) {
        return res.json({ status: false })
    }

    try {
        await saveNotify(req.body);
        const response = await notic.sendNotic(req.body)
        return res.json(response)

    } catch (error) {
        return res.json({ status: false , message: error.message})
    }
}

module.exports = { saveNotify, listNotify, sendNotic };