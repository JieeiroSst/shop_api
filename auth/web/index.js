const jwt = require('jsonwebtoken');
const { config } = require('../../config/key');
const key = config.web();

const createTokenWeb = (username, role) => {
    const payload = {
        username,
        role,
    };
    const header = {
        algorithm: 'HS256',
        noTimestamp: false,
        expiresIn: '24h',
    };
    return jwt.sign(payload, key, header);
};

const verifyTokenWeb = (token) => {
    const { username, role } = jwt.verify(token, key);
    return { username, role };
};

const authenticatedJWTWeb = async(ctx, next) => {
    let token = ctx.headers['authorization'];
    if (!token) {
        ctx.body = {
            status: 401,
            message: 'token is required',
        };
    } else {
        try {
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }
            verifyTokenWeb(token);
            await next();
        } catch (error) {
            ctx.body = {
                status: 403,
                message: 'token resolution failed',
            };
        }
    }
};

const contextShop = (ctx, next) => {
    const { authorization: token } = ctx.headers;
    const userValid = jwt.verify(token, key);
    return { userValid };
};
module.exports = {
    contextShop,
    createTokenWeb,
    verifyTokenWeb,
    authenticatedJWTWeb,
};