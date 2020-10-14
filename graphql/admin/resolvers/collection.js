const { pagination } = require('../../../base/joinmonter');

const {
    createCollection,
    updateCollection,
    removeByIdCollection,
} = require('../../../models/collection');

const resolvers = {
    Query: {
        collections: async(parent, args, context, info) => {
            return await pagination(args, context, info);
        },
    },

    Mutation: {
        createCollection: async(parent, args, context, info) => {
            const { name } = args;
            const data = await createCollection(name);
            return data;
        },

        updateCollection: async(parent, args, context, info) => {
            const { id, name } = args;
            const data = await updateCollection(id, name);
            return data;
        },

        deleteCollection: async(parent, args, context, info) => {
            const { id } = args;
            const data = await removeByIdCollection(id);
            return data;
        },
    },
};

module.exports = { resolvers };