const bcrypt = require('bcrypt');

const { getByNameUser } = require('../models/user');
const { getByIdRole } = require('../models/role');

const login = async(username, password) => {
    const [user] = await getByNameUser(username);
    const [role] = await getByIdRole(user.role_id);
    const isValid = bcrypt.compare(password, customer.password);
    const data = {
        id: user.id,
        username: user.username,
        role: role.name,
    };
    return { isValid, data };
};

module.exports = {
    login,
};