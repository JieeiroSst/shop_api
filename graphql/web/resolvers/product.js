const { createDataLoader } = require('../../../base/dataloader');
const { pagination } = require('../../../base/pagination');
const { createResolver } = require('../../resolver');

const resolvers = {
    Query: {
        products: createResolver(async(args, ctx, info) => {
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
        }, 'CUSTOMER'),
    },

    Mutation: {},

    Product: {
        createdAt: (parent) => {
            return parent.created_at;
        },

        updatedAt: (parent) => {
            return parent.updated_at;
        },

        collections: async(parent) => {
            return await createDataLoader('collections').load([parent.collection_id]);
        },
    },
};

module.exports = { resolvers };