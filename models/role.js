const { returning } = require('../db/knex');
const db = require('../db/knex');

const nameTable = 'roles';

const getAllRole = async() => {
    return await db(nameTable);
};

const getByIdRole = async(id) => {
    const condition = {
        id,
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

const deleteRole = async(id) => {
    const condition = {
        id,
    };

    return await db(nameTable)
        .del()
        .where(condition);
};

module.exports = {
    getAllRole,
    getByIdRole,
    createRole,
    updateRole,
    deleteRole,
};