const db = require('../db/knex');

const nameTable = 'collections';

const collectionAll = async() => {
    return await db(nameTable);
};

const collectionById = async(id) => {
    const condition = {
        id,
    };
    return await db(nameTable).where(condition);
};

const createCollection = async(name) => {
    const entity = {
        name,
    };
    return await db(nameTable)
        .insert(entity)
        .returning('*');
};

const updateCollection = async(id, name) => {
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

const removeCollectionById = async(id) => {
    const condition = {
        id,
    };

    return await db(nameTable)
        .del()
        .where(condition)
        .returning('*');
};

module.exports = {
    collectionAll,
    collectionById,
    updateCollection,
    createCollection,
    removeCollectionById,
};