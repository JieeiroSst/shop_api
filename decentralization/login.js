const jwt = require('jsonwebtoken');
const passport = require('koa-passport');

const { config } = require('../config');
const { roleById } = require('../models/role');

const login = (ctx, next) => {
    return passport.authenticate('local', async(err, user, info, status) => {
        if (!user) {
            ctx.body = { success: false };
            ctx.throw(401);
        } else {
            console.log(user);
            const [role] = await roleById(user.role_id);
            const pay_load = {
                user: user.username,
                role: role.name,
            };
            const token = jwt.sign(pay_load, config.key());
            ctx.body = { success: true, token };
            return ctx.login();
        }
    })(ctx, next);
};

module.exports = { login };