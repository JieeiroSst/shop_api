const Koa_router = require('koa-router');

const { login } = require('./login');

const router = new Koa_router();

router.post('/login', login);

module.exports = router;