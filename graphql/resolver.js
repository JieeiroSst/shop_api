const { roleByName } = require('../models/role');

const createResolver = (fn, role) => {
    return async(parent, args, ctx, info) => {
        console.log(ctx.isAuthenticated());
        if (!ctx.isAuthenticated()) {
            return ctx.throw(401, 'HTTP 403 Error – Forbidden');
        }
        const roleEntry = await roleByName(role);
        const roleId = roleEntry.id;
        if (roleId !== ctx.state.user.role) {
            return ctx.throw(401, 'HTTP 401 Error – Unauthorized');
        }
        return fn(args, ctx, info);
    };
};

module.exports = { createResolver };