const koa_router = require('koa-router');

const { signupWeb } = require('../../service/signup');

const router = new koa_router({ prefix: '' });

router.post('/signup', async(ctx) => {
    const { username, password } = ctx.request.body;
    const data = await signupWeb(username, password);
    ctx.body = {
        data,
    };
});

module.exports = router;