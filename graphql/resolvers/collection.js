const { pagination } = require('../../base/joinmonter');
const { roleByName } = require('../../models/role');

const resolvers = {
    Query: {
        collections: async(parent, args, ctx, info) => {
            const [role] = await roleByName('ADMIN');
            const id = role.id;
            if (id !== ctx.state.user.role) {
                ctx.throw(403, 'HTTP 401 Error – Unauthorized');
            }
            return await pagination(args, ctx, info);
        },
    },

    Mutation: {},
};

module.exports = { resolvers };