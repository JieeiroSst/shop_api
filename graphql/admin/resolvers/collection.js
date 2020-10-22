const { pagination } = require('../../../base/joinmonter');
const { createResolver } = require('../../resolver');
const {
    createCollection,
    updateCollection,
    removeCollectionById,
} = require('../../../models/collection');

const resolvers = {
    Query: {
        collections: createResolver(async(args, ctx, info) => {
            return await pagination(args, ctx, info);
        }, 'ADMIN'),
    },

    Mutation: {
        createCollection: createResolver(async(args, ctx, info) => {
            const { name } = args;
            const data = await createCollection(name);
            return data;
        }, 'ADMIN'),

        updateCollection: createResolver(async(args, ctx, info) => {
            const { id, name } = args;
            const data = await updateCollection(id, name);
            return data;
        }, 'ADMIN'),
        deleteCollection: createResolver(async(args, ctx, info) => {
            const { id } = args;
            const data = await removeCollectionById(id);
            return data;
        }, 'ADMIN'),
    },
};

module.exports = { resolvers };