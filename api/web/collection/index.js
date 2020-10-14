const koa_router = require('koa-router');

const {
    getByIdCollection,
    getAllCollection,
    createCollection,
    updateCollection,
    removeByIdCollection,
} = require('../../../models/collection');

const { authenticatedJWTWeb } = require('../../../auth/web/auth');
const { decode } = require('../../../utils/base64');

const router = new koa_router({ prefix: '/collection' });

router.get('/', authenticatedJWTWeb, async(ctx) => {
    const data = await getAllCollection();
    ctx.body = {
        data,
    };
});

router.get('/:id', authenticatedJWTWeb, async(ctx) => {
    const { id } = ctx.params;
    const idDecode = decode(id);
    const data = await getByIdCollection(idDecode);
    ctx.body = {
        data,
    };
});

router.post('/new', authenticatedJWTWeb, async(ctx) => {
    const { name } = ctx.request.body;
    const data = await createCollection(name);
    ctx.body = {
        data,
    };
});

router.put('/edit/:id', authenticatedJWTWeb, async(ctx) => {
    const { id } = ctx.params;
    const { name } = ctx.request.body;
    const idDecode = decode(id);
    const data = await updateCollection(idDecode, name);
    ctx.body = {
        data,
    };
});

router.delete('/delete/:id', authenticatedJWTWeb, async(ctx) => {
    const { id } = ctx.params;
    const idDecode = decode(id);
    const data = await removeByIdCollection(idDecode);
    ctx.body = {
        data,
    };
});

module.exports = router;