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
 * id
 * @param {*} id 
 * @returns 
 */
const deleteNotify = async (id) => {
    try {
        return await conn.query(`DELETE FROM Notify WHERE id='${id}'`);
    } catch (error) {
        return error
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
        const resultAll = await conn.query(`SELECT * FROM Notify ORDER BY id DESC `);
        const result = await conn.query(`SELECT * FROM Notify ORDER BY id DESC LIMIT ${start},${limit} `);
        return {
            datas: conn.fetch(result),
            pageAll: Math.ceil(resultAll.length / limit)
        };
    } catch (error) {
        console.log('error',error);
        return null;
    }
}

const getNotify = async (id) => {
    const result = await conn.query(`SELECT * FROM Notify WHERE id =${id} `);
    return conn.fetch(result);
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

module.exports = { saveNotify, listNotify, sendNotic, getNotify, deleteNotify};