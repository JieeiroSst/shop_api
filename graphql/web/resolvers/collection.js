const { createDataLoader } = require('../../../base/dataloader');
const { pagination } = require('../../../base/pagination');
const { createResolver } = require('../../resolver');

const resolvers = {
    Query: {
        collections: createResolver(async(args, ctx, info) => {
            let { first = null, after = 0, before = 0 } = args;
            const tableName = 'collections';
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

    Collection: {
        createdAt: (parent) => {
            return parent.created_at;
        },

        updatedAt: (parent) => {
            return parent.updated_at;
        },
        products: async(parent) => {
            return await createDataLoader('products').load([parent.id]);
        },
    },
};

module.exports = { resolvers };