const Koa_router = require('koa-router');

const { products } = require('./product');
const { authBase } = require('../../utils/verify');

const router = new Koa_router({ prefix: '' });

router.get('/product', authBase, products);

module.exports = router;