const jwt = require('jsonwebtoken');

const { roleById, roleByName } = require('../models/role');

const auth = (roles) => {
    return async(ctx, next) => {
        const [role] = await roleByName(roles);
        const id = role.id;
        if (ctx.state.user && id === ctx.state.user.role) {
            await next();
        } else {
            ctx.status = 403;
            ctx.body = {
                message: 'Authencation no access token ',
            };
        }
    };
};

module.exports = {
    auth,
};