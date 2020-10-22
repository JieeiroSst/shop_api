const { roleByName } = require('../../models/role');
const { pagination } = require('../../base/joinmonter');

const resolvers = {
    Query: {
        products: async(parent, args, ctx, info) => {
            const [role] = await roleByName('ADMIN');
            const id = role.id;
            if (id !== ctx.state.user.role) {
                return ctx.throw(403, 'HTTP 401 Error – Unauthorized');
            }
            return await pagination(args, ctx, info);
        },
    },

    Mutation: {},
};

module.exports = { resolvers };