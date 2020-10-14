const db = require('../db/knex');

const nametable = 'users';

const getAllUser = async() => {
    return await db(nametable);
};

const getByIdUser = async(id) => {
    const condition = {
        id,
    };
    return await db(nametable).where(condition);
};

const getByNameUser = async(username) => {
    const condition = {
        username,
    };
    return await db(nametable).where(condition);
};

const createUser = async(username, password, roleId, createAt, updatedAt) => {
    const entity = {
        username,
        password,
        role_id: roleId,
        created_at: createAt,
        updated_at: updatedAt,
    };
    return await db(nametable).insert(entity).returning('*');
};

const updateUser = async(
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

const removeByIdUser = async(id) => {
    const condition = {
        id,
    };
    return await db(nametable).del().where(condition).returning('*');
};

module.exports = {
    getAllUser,
    getByIdUser,
    getByNameUser,
    createUser,
    updateUser,
    removeByIdUser,
};