const { returning } = require('../db/knex');
const db = require('../db/knex');

const nameTable = 'roles';

const roleAll = async() => {
    return await db(nameTable);
};

const roleById = async(id) => {
    const condition = {
        id,
    };
    return await db(nameTable).where(condition);
};

const roleByName = async(name) => {
    const condition = {
        name,
    };
    return await db(nameTable).where(condition);
};

const createRole = async(name) => {
    const entity = {
        name,
    };

    return await db(nameTable)
        .insert(entity)
        .returning('*');
};

const updateRole = async(id, name) => {
    const condition = {
        id,
    };

    const entity = {
        name,
    };

    return await db(nameTable)
        .where(condition)
        .update(entity)
        .returning('*');
};

const removeRoleById = async(id) => {
    const condition = {
        id,
    };

    return await db(nameTable)
        .del()
        .where(condition);
};

module.exports = {
    roleAll,
    roleById,
    roleByName,
    createRole,
    updateRole,
    removeRoleById,
};