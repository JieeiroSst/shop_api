const jwt = require('jsonwebtoken');

const authBase = async(ctx, next) => {
    const user = ctx.state.user;
    if (user) {
        if (user.role_id === 1 || user.role_id === 2) {
            return await next();
        }
    }
    ctx.status = 401;
    ctx.body = {
        message: 'Authorization Token not found',
    };
};

module.exports = {
    authBase,
};