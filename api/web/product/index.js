const koa_router = require('koa-router');

const {
    getAllProduct,
    getByIdProduct,
    createProduct,
    updateProduct,
    removeByIdProduct,
} = require('../../../models/product');
const { authenticatedJWTWeb } = require('../../../auth/web');
const { decode } = require('../../../utils/base64');

const router = new koa_router({ prefix: '/product' });

router.get('/', authenticatedJWTWeb, async(ctx) => {
    const data = await getAllProduct();
    ctx.body = {
        data,
    };
});

router.get('/:id', authenticatedJWTWeb, async(ctx) => {
    const { id } = ctx.params;
    const idDecode = decode(id);
    const data = await getByIdProduct(idDecode);
    ctx.body = {
        data,
    };
});

router.post('/new', authenticatedJWTWeb, async(ctx) => {
    const { name, decription, price, collection_id } = ctx.request.body;
    const data = await createProduct(name, decription, price, collection_id);

    ctx.body = {
        data,
    };
});

router.put('/edit/:id', authenticatedJWTWeb, async(ctx) => {
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

router.delete('/delete/:id', authenticatedJWTWeb, async(ctx) => {
    const { id } = ctx.params;
    const idDecode = decode(id);
    const data = await removeByIdProduct(idDecode);
    ctx.body = {
        data,
    };
});

module.exports = router;