const db = require('../db/knex');

const nameTable = 'products';

const productAll = async() => {
    return await db(nameTable);
};

const productById = async(id) => {
    const condition = {
        id,
    };
    return await db(nameTable).where(condition);
};

const createProduct = async(name, decription, price, collection_id) => {
    const entity = {
        name,
        decription,
        price,
        collection_id,
    };

    return await db(nameTable)
        .insert(entity)
        .returning('*');
};

const updateProduct = async(id, name, decription, price, collection_id) => {
    const condition = {
        id,
    };

    const entity = {
        name,
        decription,
        price,
        collection_id,
    };

    return await db(nameTable)
        .where(condition)
        .update(entity)
        .returning('*');
};

const removeProductById = async(id) => {
    const condition = {
        id,
    };
    return await db(nameTable)
        .del()
        .where(condition)
        .returning('*');
};

module.exports = {
    productAll,
    productById,
    createProduct,
    updateProduct,
    removeProductById,
};