const Koa_router = require('koa-router');

const { login } = require('./user');
const { products, product } = require('./product');
const passport = require('../../base/admin');

const router = new Koa_router({ prefix: '/admin' });

router
    .post('/login', login)
    .get('/product', passport.authenticate('jwt', { session: false }), products)
    .get('/product/:id', product);

module.exports = router;