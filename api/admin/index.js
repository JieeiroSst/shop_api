const Koa_router = require('koa-router');

const { products } = require('./product');
const { checkAdmin } = require('../../utils/verify');

const router = new Koa_router({ prefix: '/admin' });

router.get('/product', checkAdmin, products);

module.exports = router;