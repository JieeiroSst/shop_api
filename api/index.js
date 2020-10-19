const Koa_router = require('koa-router');

const { login } = require('./login');
const { products } = require('./product');

const passport = require('../base/passport');

const router = new Koa_router();

router.post('/login', login);

router.get(
    '/product',
    passport.authenticate('jwt', { session: false }),
    products
);

module.exports = router;