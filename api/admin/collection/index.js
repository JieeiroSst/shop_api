const koa_router = require('koa-router');

const {
    getAllCollection,
    getByIdCollection,
    createCollection,
    updateCollection,
    removeByIdCollection,
} = require('../../../models/collection');
const { authenticatedJWTAdmin } = require('../../../auth/admin');
const { decode } = require('../../../utils/base64');
const router = new koa_router({ prefix: '/admin/collection' });

router.get('/', authenticatedJWTAdmin, async(ctx) => {
    const data = await getAllCollection();
    const newData = data.map((item) => {
        return {
            id: item.id,
            name: item.name,
            createdAt: item.created_at,
            updatedat: item.updated_at,
        };
    });
    ctx.body = {
        newData,
    };
});

router.get('/:id', authenticatedJWTAdmin, async(ctx) => {
    const { id } = ctx.params;
    const idDecode = decode(id);

    const data = await getByIdCollection(idDecode);
    const newData = data.map((item) => {
        return {
            id: item.id,
            name: item.name,
            createdAt: item.created_at,
            updatedat: item.updated_at,
        };
    });
    ctx.body = {
        newData,
    };
});

router.post('/new', authenticatedJWTAdmin, async(ctx) => {
    const { name } = ctx.request.body;
    const data = await createCollection(name);
    const newData = data.map((item) => {
        return {
            id: item.id,
            name: item.name,
            createdAt: item.created_at,
            updatedat: item.updated_at,
        };
    });
    ctx.body = {
        newData,
    };
});

router.put('/edit/:id', authenticatedJWTAdmin, async(ctx) => {
    const { id } = ctx.params;
    const { name } = ctx.request.body;

    const idDecode = decode(id);
    const data = await updateCollection(idDecode, name);
    const newData = data.map((item) => {
        return {
            id: item.id,
            name: item.name,
            createdAt: item.created_at,
            updatedat: item.updated_at,
        };
    });
    ctx.body = {
        newData,
    };
});

router.delete('/delete/:id', authenticatedJWTAdmin, async(ctx) => {
    const { id } = ctx.params;
    const idDecode = decode(id);
    const data = await removeByIdCollection(idDecode);
    const newData = data.map((item) => {
        return {
            id: item.id,
            name: item.name,
            createdAt: item.created_at,
            updatedat: item.updated_at,
        };
    });
    ctx.body = {
        newData,
    };
});

module.exports = router;