const Koa_router = require('koa-router');

const { login } = require('./user');
const passport = require('../../base/admin');

const router = new Koa_router({ prefix: '/admin' });

router.post('/login', login);
//.get('/product', passport.authenticate('jwt', { session: false }), products)
module.exports = router;