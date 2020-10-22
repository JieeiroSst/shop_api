const DataLoader = require('dataloader');

const db = require('../../db/knex');
const { mapIds } = require('../../utils/map');

const createDataLoader = (resource) => {
    return new DataLoader(async(list) => {
        return await Promise.all(
            list.map(async(ids) => {
                const data = await db(resource).whereRaw(`id = any(?)`, [ids]);
                return mapIds(ids, data);
            })
        );
    });
};

module.exports = { createDataLoader };