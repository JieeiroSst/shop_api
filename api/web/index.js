const Koa_router = require('koa-router');

const { products } = require('./product');
const { checkCustomer } = require('../../utils/verify');

const router = new Koa_router({ prefix: '' });

router.get('/product', checkCustomer, products);

module.exports = router;