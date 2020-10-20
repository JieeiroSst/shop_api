const DataLoader = require('dataloader');

const db = require('../../db/knex');

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

module.exports = { loader };