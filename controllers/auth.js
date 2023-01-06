const bcrypt = require('bcrypt');
require('dotenv').config();
const { createUser } = require('../service/auth')

const login = async (req, res) => {
    res.render('pages/auth/login');
}

const loginCheck = (req,res) => {
    
}

const createAdmin = async (req, res) => {
    const { email, password, hash } = req.body;
    const hashEnv = process.env.HASH;
    if (hashEnv !== hash) {
        return res.status(400).json({ status: false, message: 'Bad request : hash' });
    }

    const hasPassword = await bcrypt.hash(password, 10);
    const create = await createUser({
        email: email,
        password: hasPassword
    })

    if (typeof create ==='string' ) {
        return res.status(400).json({ status: false, message: create });
    }

    return res.status(200).json({ status: true, message: 'Created Admin' });
}

module.exports = { login, createAdmin}