const Koa_router = require('koa-router');

const { login } = require('./user');
const { products } = require('./product');

const router = new Koa_router();

router.post('/login', login).get('/product', products);

module.exports = router;