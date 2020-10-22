const { roleByName } = require('../models/role');

const auth = (roles) => {
    return async(ctx, next) => {
        console.log(ctx.state);
        const [role] = await roleByName(roles);
        const id = role.id;
        if (id === ctx.state.user.role) {
            await next();
        } else {
            ctx.status = 403;
            ctx.body = {
                ok: false,
                message: 'HTTP 401 Error – Unauthorized',
            };
        }
    };
};

module.exports = {
    auth,
};