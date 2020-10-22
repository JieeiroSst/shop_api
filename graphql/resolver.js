const { roleByName } = require('../models/role');

const createResolver = (fn, role) => {
    return async(parent, args, ctx, info) => {
        const [user] = await roleByName(role);
        const id = user.id;
        if (id !== ctx.state.user.role) {
            return ctx.throw(403, 'HTTP 401 Error – Unauthorized');
        }
        return fn(args, ctx, info);
    };
};

module.exports = { createResolver };