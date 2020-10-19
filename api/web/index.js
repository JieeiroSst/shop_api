const Koa_router = require('koa-router');

const { products } = require('./product');
const { auth } = require('../../utils/verify');

const router = new Koa_router({ prefix: '' });

router.get('/product', auth, products);

module.exports = router;