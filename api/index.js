const Koa_router = require('koa-router');

const { login } = require('./login');
const { products } = require('./product');

const router = new Koa_router();

router.post('/login', login);

router.get('/product', products);

module.exports = router;