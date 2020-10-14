const koa_router = require('koa-router');

const {
    getAllProduct,
    getByIdProduct,
    createProduct,
    updateProduct,
    removeByIdProduct,
} = require('../../../models/product');
const { decode } = require('../../../utils/base64');
const { authenticatedJWTAdmin } = require('../../../auth/admin');

const router = new koa_router({ prefix: '/admin/product' });

router.get('/', authenticatedJWTAdmin, async(ctx) => {
    const data = await getAllProduct();

    ctx.body = {
        data,
    };
});

router.get('/:id', authenticatedJWTAdmin, async(ctx) => {
    const { id } = ctx.params;
    const idDecode = decode(id);

    const data = await getByIdProduct(idDecode);
    ctx.body = {
        data,
    };
});

router.post('/new', authenticatedJWTAdmin, async(ctx) => {
    const { name, decription, price, collection_id } = ctx.request.body;
    const data = await createProduct(name, decription, price, collection_id);

    ctx.body = {
        data,
    };
});

router.put('/edit/:id', authenticatedJWTAdmin, async(ctx) => {
    const { name, decription, price, collection_id } = ctx.request.body;
    const { id } = ctx.params;
    const idDecode = decode(id);

    const data = await updateProduct(
        idDecode,
        name,
        decription,
        price,
        collection_id
    );

    ctx.body = {
        data,
    };
});

router.delete('/delete/:id', authenticatedJWTAdmin, async(ctx) => {
    const { id } = ctx.params;
    const idDecode = decode(id);

    const data = await removeByIdProduct(idDecode);
    ctx.body = {
        data,
    };
});

module.exports = router;