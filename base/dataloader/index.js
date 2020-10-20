const DataLoader = require('dataloader');

const db = require('../../db/knex');
const { mapIds } = require('../../utils/map');

const loader = () => ({
    collectionProductById: new DataLoader(async(id) => {
        const condition = db.raw(`id = ANY(?)`, [id]);
        const products = await db('products').where(condition);
        return [products];
    }),

    productCollectionById: new DataLoader(async(id) => {
        const condition = db.raw(`id = ANY(?)`, [id]);
        const collections = await db('collections').where(condition);
        return [collections];
    }),
});

const createDataLoader = (resource) => {
    return new DataLoader(async(list) => {
        return await Promise.all(
            list.map(async(ids) => {
                const data = await db(resource).whereRaw(`id = any(?)`, [ids]);
                console.log(ids, data);
                return mapIds(ids, data);
            })
        );
    });
};

module.exports = { loader, createDataLoader };