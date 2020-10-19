const jwt = require('jsonwebtoken');
const passport = require('koa-passport');

const { config } = require('../../../config');

const login = (ctx, next) => {
    return passport.authenticate('local', (err, user, info, status) => {
        if (!user) {
            ctx.body = { success: false };
            ctx.throw(401);
        } else {
            const pay_load = {
                user: user.username,
                role: user.role_id,
            };
            const token = jwt.sign(pay_load, config.admin());
            ctx.body = { success: true, token };
            return ctx.login(user);
        }
    })(ctx, next);
};

module.exports = { login };