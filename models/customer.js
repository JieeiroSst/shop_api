const db = require('../db/knex');

const nametable = 'customers';

const customerAll = async() => {
    return await db(nametable);
};

const customerById = async(id) => {
    const condition = {
        id,
    };
    return await db(nametable).where(condition);
};

const customerByName = async(username) => {
    const condition = {
        username,
    };
    return await db(nametable).where(condition);
};

const createCustomer = async(username, password, roleId) => {
    const entity = {
        username,
        password,
        role_id: roleId,
    };
    return await db(nametable)
        .insert(entity)
        .returning('*');
};

const updateCustomer = async(
    id,
    username,
    password,
    roleId,
    createAt,
    updatedAt
) => {
    const entity = {
        username,
        password,
        role_id: roleId,
        created_at: createAt,
        updated_at: updatedAt,
    };
    const condition = {
        id,
    };
    return await db(nametable)
        .where(condition)
        .update(entity)
        .returning('*');
};

const removeCustomerById = async(id) => {
    const condition = {
        id,
    };
    return await db(nametable)
        .del()
        .where(condition)
        .returning('*');
};

module.exports = {
    customerAll,
    customerById,
    customerByName,
    createCustomer,
    updateCustomer,
    removeCustomerById,
};