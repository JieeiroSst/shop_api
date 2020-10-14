const { createRole, updateRole, deleteRole } = require('../../../models/role');

const resolvers = {
    Query: {},

    Mutation: {
        createRole: async(parent, args, context, info) => {
            const { name } = args;
            return await createRole(name);
        },
        updateRole: async(parent, args, context, info) => {
            const { id, name } = args;
            return await updateRole(id, name);
        },
        deleteRole: async(parent, args, context, info) => {
            const { id } = args;
            return await deleteRole(id);
        },
    },
};

module.exports = { resolvers };