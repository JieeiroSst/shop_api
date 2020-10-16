const bcrypt = require('bcrypt');

const { getAllCustomer, createCustomer } = require('../models/customer');
const { getAllUser, createUser } = require('../models/user');
const signupWeb = async(username, password) => {
    const roleId = 2;
    const res = await getAllCustomer();
    const customer = res.map((item) => {
        return item.username;
    });

    for (let i = 0; i < customer.length; i++) {
        if (customer[i] === username) {
            throw new Error('This user already exists');
        }
    }

    const hashPassword = bcrypt.hashSync(password, 12);
    const data = await createCustomer(username, hashPassword, roleId);
    return data;
};