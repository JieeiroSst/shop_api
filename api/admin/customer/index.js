const koa_router = require('koa-router');

const {
    getAllCustomer,
    getByIdCustomer,
    removeByIdCustomer,
} = require('../../../models/customer');
const { decode } = require('../../../utils/base64');
const { authenticatedJWTAdmin } = require('../../../auth/admin/auth');

const router = new koa_router({ prefix: '/admin/customer' });

router.get('/', authenticatedJWTAdmin, async() => {
    const data = await getAllCustomer();

    ctx.body = {
        data,
    };
});

router.get('/:id', authenticatedJWTAdmin, async(ctx) => {
    const { id } = ctx.params;
    const idDecode = decode(id);

    const data = await getByIdCustomer(idDecode);
    ctx.body = {
        data,
    };
});

router.delete('/delete/:id', authenticatedJWTAdmin, async(ctx) => {
    const { id } = ctx.params;
    const idDecode = decode(id);

    const data = await removeByIdCustomer(idDecode);
    ctx.body = {
        data,
    };
});

module.exports = router;