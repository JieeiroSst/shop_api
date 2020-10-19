const LocalStrategy = require('passport-local');
const brcypt = require('bcrypt');

const { customerByName } = require('../../models/customer');

module.exports = new LocalStrategy({ session: false },
    async(username, password, callback) => {
        const [user] = await customerByName(username);
        const isCheck = brcypt.compare(password, user.password);
        if (isCheck) {
            callback(null, user);
        } else {
            callback(null, false);
        }
    }
);