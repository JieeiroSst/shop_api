const LocalStrategy = require('passport-local').Strategy;
const brcypt = require('bcrypt');

const { userByName } = require('../models/user');

module.exports = new LocalStrategy({ session: false },
    async(username, password, callback) => {
        const [user] = await userByName(username);
        const isCheck = brcypt.compare(password, user.password);
        if (isCheck) {
            callback(null, user);
        } else {
            callback(null, false);
        }
    }
);