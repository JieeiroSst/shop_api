const Koa_router = require('koa-router');

const { login } = require('./login');
const { products } = require('./product');
const { auth } = require('../utils/verify');
const passport = require('../base/passport');

const router = new Koa_router();

router.post('/login', login);

router.get(
    '/product',
    passport.authenticate('jwt', { session: false }),
    products
);

router.get('/test', auth('ADMIN'), (ctx) => {
    ctx.body = {
        data: ctx.state.user,
    };
});

module.exports = router;