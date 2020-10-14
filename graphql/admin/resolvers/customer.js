const { pagination } = require('../../../base/joinmonter');

const resolvers = {
    Query: {
        customers: async(parent, args, context, info) => {
            const data = await pagination(args, context, info);
            return data;
        },
    },
};

module.exports = { resolvers };