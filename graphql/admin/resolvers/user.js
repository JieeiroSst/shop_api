const { pagination } = require('../../../base/joinmonter');

const resolvers = {
    Query: {
        users: async(parent, args, context, info) => {
            const data = await pagination(args, context, info);
            return data;
        },
    },

    Mutation: {},
};

module.exports = { resolvers };