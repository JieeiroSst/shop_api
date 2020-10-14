const koa_router = require('koa-router');

const { loginWeb } = require('../../service/login');

const router = new koa_router({ prefix: '' });

router.post('/login', async(ctx) => {
    const { username, password } = ctx.request.body;
    const data = await loginWeb(username, password);
    ctx.body = {
        token: data,
    };
});

module.exports = router;