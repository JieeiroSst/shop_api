const jwt = require('jsonwebtoken');

const { config } = require('../config');

const checkAdmin = async(ctx, next) => {
    const { authorization: token } = ctx.headers;
    if (token) {
        const verify = jwt.verify(token, config.key());
        if (verify.role === 'ADMIN' || verify.role === 'CUSTOMER') {
            return await next();
        }
    }
    ctx.status = 401;
    ctx.body = {
        message: 'Authorization Token not found',
    };
};

const checkCustomer = async(ctx, next) => {
    const { authorization: token } = ctx.headers;
    if (token) {
        const verify = jwt.verify(token, config.key());
        if (verify.role === 'CUSTOMER') {
            return await next();
        }
    }
    ctx.status = 401;
    ctx.body = {
        message: 'Authorization Token not found',
    };
};

module.exports = {
    checkAdmin,
    checkCustomer,
};