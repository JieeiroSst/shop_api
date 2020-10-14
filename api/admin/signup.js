const koa_router = require('koa-router');

const { signupAdmin } = require('../../service/signup');

const router = new koa_router({
    prefix: '/admin',
});

router.post('/signup', async(ctx) => {
    const { username, password } = ctx.request.body;
    const data = await signupAdmin(username, password);
    ctx.body = {
        user: data,
    };
});

module.exports = router;