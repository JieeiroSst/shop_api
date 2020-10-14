const koa_router = require('koa-router');
const { loginAdmin } = require('../../service/login');

const router = new koa_router({
    prefix: '/admin',
});

router.post('/login', async(ctx) => {
    const { username, password } = ctx.request.body;
    try {
        const data = await loginAdmin(username, password);
        ctx.body = {
            token: data,
        };
    } catch (error) {
        ctx.body = {
            message: 'login unsuccessful',
        };
    }
});

module.exports = router;