const { Token } = require('graphql');
const jwt = require('jsonwebtoken');

const { config } = require('../../config');

const contextAdmin = (ctx) => {
    let { authorization: token } = ctx.headers;
    try {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        const userValid = jwt.verify(token, config.admin());
        return { userValid };
    } catch (error) {
        throw new Error('');
    }
};

module.exports = { contextAdmin };