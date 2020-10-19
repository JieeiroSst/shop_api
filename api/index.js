const Koa_router = require('koa-router');

const { login } = require('./login');
const { products } = require('./product');
const { auth } = require('../auth/verify');
const passport = require('../base/passport');

const router = new Koa_router();

router.post('/login', login);

router.get('/product', auth('ADMIN'), products);

router.get('/test', auth('ADMIN'), (ctx) => {
    ctx.body = {
        data: ctx.state.user,
    };
});

router.get('/test1', auth('CUSTOMER'), (ctx) => {
    console.log(ctx.state.user);
    ctx.body = {
        data: ctx.state.user,
    };
});

module.exports = router;