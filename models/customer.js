const db = require('../db/knex');

const nametable = 'customers';

const getAllCustomer = async() => {
    return await db(nametable);
};

const getByIdCustomer = async(id) => {
    const condition = {
        id,
    };
    return await db(nametable).where(condition);
};

const getByNameCustomer = async(username) => {
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
    return await db(nametable).insert(entity).returning('*');
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
    return await db(nametable).where(condition).update(entity).returning('*');
};

const removeByIdCustomer = async(id) => {
    const condition = {
        id,
    };
    return await db(nametable).del().where(condition).returning('*');
};

module.exports = {
    getAllCustomer,
    getByIdCustomer,
    getByNameCustomer,
    createCustomer,
    updateCustomer,
    removeByIdCustomer,
};