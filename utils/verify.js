const jwt = require('jsonwebtoken');

const { roleById } = require('../models/role');

const auth = async(ctx, next) => {
    console.log(ctx.state.user);
    const { authorization: token } = ctx.headers;
    if (token) {
        const user = ctx.state.user;
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
    auth,
};