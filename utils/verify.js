const jwt = require('jsonwebtoken');

const { config } = require('../config');

const checkAdmin = async(ctx, next) => {
    const { authorization: token } = ctx.headers;
    const verify = jwt.verify(token, config.key());
    if (verify.role === 'ADMIN' || verify.role === 'CUSTOMER') {
        await next();
    } else {
        ctx.body = {
            message: 'not permisson',
        };
    }
};

const checkCustomer = async(ctx, next) => {
    const { authorization: token } = ctx.headers;
    const verify = jwt.verify(token, config.key());
    if (verify.role === 'CUSTOMER') {
        await next();
    } else {
        ctx.body = {
            message: 'not permisson',
        };
    }
};

module.exports = {
    checkAdmin,
    checkCustomer,
};