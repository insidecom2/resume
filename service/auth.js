const conn = require('../database/connect');
const passport = require('passport')
const userModel = require('../database/userModel')


const createUser = async (body) => {
    const { email, password } = body;
    try {
        const resultData = await userModel.listUsersAll();
        
        if (resultData.length > 0) {
            return null
        }
    
        return await userModel.createUser({
            fullName: "Admin",
            role: "Admin",
            email: email,
            password: password
        })
        
    } catch (error) {
        console.log(error)
        return null;
    }
}


const login = (body) => {

}


module.exports = { createUser, login}