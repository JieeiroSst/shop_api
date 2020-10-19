const bcrypt = require('bcrypt');

const { getAllUser, createUser } = require('../models/user');
const signup = async(username, password, roleId) => {
    const res = await getAllUser();
    const users = res.map((item) => {
        return item.username;
    });
    for (let user of users) {
        if (user === username) {
            throw new Error('This user already exists');
        }
    }
    const hashPassword = bcrypt.hashSync(password, 12);
    const data = await createUser(username, hashPassword, roleId);
    return data;
};

module.exports = { signup };