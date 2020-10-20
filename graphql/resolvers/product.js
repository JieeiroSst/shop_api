const { loader, createDataLoader } = require('../../base/dataloder');
const { pagination, paginations } = require('../../base/pagination');
const db = require('../../db/knex');

const resolvers = {
    Query: {
        products: async(parent, args, context, info) => {
            let { first = null, after = 0, before = 0 } = args;
            const tableName = 'products';
            const { total, edges, pageInfo } = await pagination(
                tableName,
                first,
                after,
                before
            );
            const result = {
                total,
                edges,
                pageInfo,
            };
            return result;
            //     const query = db('products').select('id');
            //     const loaders = await createDataLoader('products');
            //     const data = await paginations(query, args, loaders);
            //     console.log(data);
            //     return data;
        },
    },

    Mutation: {},

    Product: {
        createdAt: (parent) => {
            return parent.created_at;
        },

        updatedAt: (parent) => {
            return parent.updated_at;
        },

        collections: (parent) => {
            return loader().collectionProductById.load(parent.collection_id);
        },
    },
};

module.exports = { resolvers };