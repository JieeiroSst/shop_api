const { pagination } = require('../../../base/joinmonter');
const { createResolver } = require('../../resolver');
const { createCollection } = require('../../../models/collection');

const resolvers = {
    Query: {
        collections: createResolver(async(args, ctx, info) => {
            return await pagination(args, ctx, info);
        }, 'ADMIN'),
    },

    Mutation: {
        createCollection: createResolver(async(args, ctx, info) => {
            const { name } = args;
            console.log(name);
            const data = await createCollection(name);
            console.log(data);
            return data;
        }, 'ADMIN'),
    },
};

module.exports = { resolvers };