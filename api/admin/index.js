const Koa_router = require('koa-router');

const { products } = require('./product');
const { auth } = require('../../utils/verify');
const passport = require('../../base/passport');

const router = new Koa_router({ prefix: '/admin' });

router.get(
    '/product',
    passport.authenticate('jwt', { session: false }),
    products
);

module.exports = router;