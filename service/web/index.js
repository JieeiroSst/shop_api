const bcrypt = require('bcrypt');

const { getByNameCustomer, createCustomer } = require('../../models/customer');

const { getByIdRole } = require('../../models/role');

const loginWeb = async(username, password) => {
    const [customer] = await getByNameCustomer(username);
    const [role] = await getByIdRole(customer.role_id);
    const isValid = bcrypt.compare(password, customer.password);
    return isValid;
};

const signupWeb = async(username, password) => {
    const roleId = 2;
    const res = await getAllCustomer();
    const customers = res.map((item) => {
        return item.username;
    });

    for (const user of customers) {
        if (user === username) {
            throw new Error('This user already exists');
        }
    }

    const hashPassword = bcrypt.hashSync(password, 12);
    const data = await createCustomer(username, hashPassword, roleId);
    return data;
};