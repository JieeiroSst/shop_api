const { roleByName } = require('../models/role');

const auth = (roles) => {
    return async(ctx, next) => {
        console.log(ctx.state);
        const [role] = await roleByName(roles);
        const id = role.id;
        if (ctx.state.user && id === ctx.state.user.role) {
            await next();
        } else {
            ctx.status = 403;
            ctx.body = {
                ok: false,
                message: 'Authencation no access token ',
            };
        }
    };
};

const checkRole = (roles) => {
    return async(ctx, next) => {
        const [role] = await roleByName(roles);
        const id = role.id;
        if (id !== ctx.state.user.role) {
            ctx.status = 401;
            ctx.throw(401, 'HTTP 401 Error – Unauthorized');
        }
    };
};

module.exports = {
    auth,

    checkRole,
};