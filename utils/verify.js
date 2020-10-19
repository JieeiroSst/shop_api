const jwt = require('jsonwebtoken');

const { roleById, roleByName } = require('../models/role');

const auth = (roles) => {
    return async(ctx, next) => {
        const [role] = await roleByName(roles);
        const id = role.id;
        console.log(ctx.state.user);
        if (ctx.state.user && id === ctx.state.user.role) {
            await next();
        } else {
            ctx.status = 403;
        }
    };
};

module.exports = {
    auth,
};