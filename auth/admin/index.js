const jwt = require('jsonwebtoken');
const { config } = require('../../config/key');

const key = config.admin();

const createTokenAdmin = (username, role) => {
    const payload = {
        username,
        role,
    };
    const header = {
        algorithm: 'HS256',
        noTimestamp: false,
        expiresIn: '365d',
    };
    return jwt.sign(payload, key, header);
};

const verifyTokenAdmin = async(token) => {
    const { username, role } = await jwt.verify(token, key);
    return { username, role };
};

const authenticatedJWTAdmin = async(ctx, next) => {
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
            verifyTokenAdmin(token);
            await next();
        } catch (error) {
            ctx.body = {
                status: 403,
                message: 'token resolution failed',
            };
        }
    }
};

const contextAdmin = (ctx, next) => {
    const { authorization: token } = ctx.headers;
    const userValid = jwt.verify(token, key);
    return { userValid };
};

module.exports = {
    contextAdmin,
    createTokenAdmin,
    verifyTokenAdmin,
    authenticatedJWTAdmin,
};