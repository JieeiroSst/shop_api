const { createDataLoader } = require('../../base/dataloader');
const { pagination } = require('../../base/pagination');
const { roleByName, roleById } = require('../../models/role');
const { UserById } = require('../../models/user');

const resolvers = {
    Query: {
        products: async(parent, args, context, info) => {
            let { first = null, after = 0, before = 0 } = args;
            const { user: id } = context.state._passport.session;
            const [user] = await UserById(id);
            if (context.state.user.role === user.role_id) {
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
                context.throw('Authencation no access token ');
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