const DataLoader = require('dataloader');
const db = require('../db/knex');

const loader = () => ({
    getCollectionProductById: new DataLoader(async(id) => {
        console.log(id);
        const cond = db.raw(`id = ANY(?)`, [id]);
        const products = await db('products').where(cond);
        return [products];
    }),

    getProductCollection: new DataLoader(async(id) => {
        const cond = db.raw(`id = ANY(?)`, [id]);
        const collections = await db('collections').where(cond);
        return [collections];
    }),
});

module.exports = { loader };