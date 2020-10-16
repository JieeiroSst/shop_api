const { Token } = require('graphql');
const jwt = require('jsonwebtoken');

const { config } = require('../../config');

const contextAdmin = (ctx) => {
    const { authorization: token } = ctx.headers;
    const userValid = jwt.verify(token, config.admin());
    console.log(token);
    return { userValid };
};

module.exports = { contextAdmin };