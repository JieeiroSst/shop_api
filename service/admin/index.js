const bcrypt = require('bcrypt');

const { getAllUser, getByNameUser, createUser } = require('../../models/user');
const { getByIdRole } = require('../../models/role');

const signupAdmin = async(username, password) => {
    const roleId = 1;
    const res = await getAllUser();
    const users = res.map((item) => {
        return item.username;
    });

    for (const user of users) {
        if (user === username) {
            throw new Error('This user already exists');
        }
    }

    const hashPassword = bcrypt.hashSync(password, 12);
    const data = createUser(username, hashPassword, roleId);
    return data;
};

const loginAdmin = async(username, password) => {
    const [user] = await getByNameUser(username);
    const [role] = await getByIdRole(user.role_id);
    const isValid = bcrypt.compare(password, user.password);
    return isValid;
};

module.exports = {
    loginAdmin,
    signupAdmin,
};