const { Token } = require('graphql');
const passport = require('passport');

const { config } = require('../../config');

const contextAdmin = (ctx) => {
    const { authorization: token } = ctx.headers;
    const userValid = jwt.verify(token, config.admin());
    console.log(token);
    return { userValid };
};

module.exports = { contextAdmin };