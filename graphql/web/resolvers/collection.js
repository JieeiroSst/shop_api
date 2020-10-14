const { pagination } = require('../../../utils/pagination');
const { loader } = require('../../../base/dataloader');

const resolvers = {
    Query: {
        collections: async(parent, args, context, info) => {
            let { first = null, after = 0, before = 0 } = args;
            const tableName = 'collections';
            const { total, edges, pageInfo } = await pagination(
                tableName,
                first,
                after,
                before
            );
            const result = { total, edges, pageInfo };
            return result;
        },
    },
    Mutation: {},
    Collection: {
        createdAt: (parent) => {
            return parent.created_at;
        },

        updatedAt: (parent) => {
            return parent.updated_at;
        },
        products: (parent) => {
            return loader().getProductCollection.load(parent.id);
        },
    },
};

module.exports = { resolvers };