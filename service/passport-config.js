const LocalStrategy = require('passport-local').Strategy
const userModel = require('../database/userModel')
const bcrypt = require('bcrypt');


const initialize = (passport) => {
    const authenticateUser = async (email, password, done) => {

        const getUser = await userModel.getUserByEmail(email);
        if (getUser.length === 0) {
            return done(null, false, { message: 'No user found.'})
        }

        try {
            if (!await bcrypt.compare(password, getUser[0].password)) {
                return done(null, false, { message: 'Password not match.'})
            }
            return done(null, getUser[0]);

        } catch (error) {
            return done(error)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' },
        authenticateUser))

    passport.serializeUser((user, done) => { done(null, user.id)})
    passport.deserializeUser((id, done) => { done(null, id)})
}

module.exports =  initialize 