const { createDataLoader } = require('../../base/dataloader');
const { pagination } = require('../../base/pagination');
const { checkRole } = require('../../auth/verify');
const { roleByName } = require('../../models/role');

const resolvers = {
    Query: {
        products: async(parent, args, ctx, info) => {
            let { first = null, after = 0, before = 0 } = args;
            const [role] = await roleByName('ADMIN');
            const id = role.id;
            if (id !== ctx.state.user.role) {
                return ctx.throw(403, 'HTTP 401 Error – Unauthorized');
            }
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