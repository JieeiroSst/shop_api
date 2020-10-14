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

module.exports = { getAllRole, getByIdRole };