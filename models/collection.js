const db = require('../db/knex');

const nameTable = 'collections';

const getAllCollection = async() => {
    return await db(nameTable);
};

const getByIdCollection = async(id) => {
    const condition = {
        id,
    };
    return await db(nameTable).where(condition);
};

const createCollection = async(name) => {
    const entity = {
        name,
    };
    return await db(nameTable).insert(entity).returning('*');
};

const updateCollection = async(id, name) => {
    const condition = {
        id,
    };
    const entity = {
        name,
    };

    return await db(nameTable).where(condition).update(entity).returning('*');
};

const removeByIdCollection = async(id) => {
    const condition = {
        id,
    };

    return await db(nameTable).del().where(condition).returning('*');
};

module.exports = {
    getAllCollection,
    getByIdCollection,
    updateCollection,
    createCollection,
    removeByIdCollection,
};