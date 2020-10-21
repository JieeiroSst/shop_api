const { createDataLoader } = require('../../base/dataloader');
const { pagination } = require('../../base/pagination');
const { UserById } = require('../../models/user');

const resolvers = {
    Query: {
        products: async(parent, args, ctx, info) => {
            let { first = null, after = 0, before = 0 } = args;
            const { user: id } = ctx.state._passport.session;
            const [user] = await UserById(id);
            if (ctx.state.user.role === user.role_id) {
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
            } else {
                ctx.status = 401;
                ctx.throw('HTTP 401 Error – Unauthorized');
            }
        },
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