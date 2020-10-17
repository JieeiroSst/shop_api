const jwt = require('jsonwebtoken');

const { config } = require('../config');

const checkAdmin = (ctx, next) => {
    console.log('---', ctx);
    const { authorization: token } = ctx.headers;
    const verify = jwt.verify(token, config.key());
    console.log(verify);
};

module.exports = {
    checkAdmin,
};