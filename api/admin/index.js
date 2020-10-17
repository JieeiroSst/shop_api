const Koa_router = require('koa-router');

const { products } = require('./product');
const { checkAdmin } = require('../../utils/verify');

const router = new Koa_router();

router.get('/', checkAdmin, products);

module.export = router;