const conn = require('./connect');

const createUser = async (body) => {
    try {
        const { fullName, role, email, password } = body;
        return await conn.query(`INSERT INTO User SET full_name='${fullName}', role='${role}', email= '${email}', password= '${password}'`);
    } catch (error) {
        return error;
    }
}

const listUsersAll = async () => {
    try {
        const result = await conn.query(`SELECT * FROM User`);
        return conn.fetch(result);
    } catch (error) {
        return [];
    }
}

const getUserByEmail = async (email) => {
    try {
        const result = await conn.query(`SELECT * FROM User where email='${email}'`);
        return conn.fetch(result);
    } catch (error) {
        return [];
    }
}

module.exports = { listUsersAll, createUser, getUserByEmail }