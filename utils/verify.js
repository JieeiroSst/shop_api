const jwt = require('jsonwebtoken');

const { roleById } = require('../models/role');

const auth = async(ctx, next) => {
    const { authorization: token } = ctx.headers;

    if (token) {
        const user = ctx.state.user;
        const [role] = await roleById(user.role_id);
        switch (role.name) {
            case 'ADMIN':
                if (user.role_id === 1 || user.role_id === 2) {
                    return await next();
                }
                break;
            case 'CUSTOMER':
                if (user.role_id === 2) {
                    return await next();
                }
                break;
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