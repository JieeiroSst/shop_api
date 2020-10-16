const Koa_router = require('koa-router');
const jwt = require('jsonwebtoken');
const passport = require('koa-passport');

const { config } = require('../../config');

const router = new Koa_router();

router.post('/login', (ctx, next) => {
    return passport.authenticate('local', (err, user, info, status) => {
        if (!user) {
            ctx.body = { success: false };
            ctx.throw(401);
        } else {
            const token = jwt.sign(user, config.admin());
            ctx.body = { success: true, token };
            return ctx.login(user);
        }
    })(ctx, next);
});

module.exports = router;