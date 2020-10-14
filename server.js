const koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    session = require('koa-session'),
    KoaConvert = require('koa-convert'),
    mount = require('koa-mount'),
    graphqlHTTP = require('koa-graphql'),
    cors = require('cors');

const { schemaAdmin } = require('./graphql/admin/index'), { schemaWeb } = require('./graphql/web/index');

const { contextAdmin } = require('./auth/admin'), { contextShop } = require('./auth/web');

const adminRouter = require('./api/admin'),
    webRouter = require('./api/web');

const app = new koa();

app.use(cors()).use(bodyParser());

const CONFIG = {
    key: 'koa.sess',
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
    secure: true,
    sameSite: null,
};

app.use(session(CONFIG, app));

app
    .use(adminRouter.login.routes())
    .use(adminRouter.signup.routes())
    .use(adminRouter.collection.routes())
    .use(adminRouter.customer.routes())
    .use(adminRouter.product.routes());

app
    .use(webRouter.login.routes())
    .use(webRouter.signup.routes())
    .use(webRouter.collection.routes())
    .use(webRouter.product.routes());

app.use(
    mount(
        '/graphql/admin',
        graphqlHTTP(async(ctx) => ({
            schema: schemaAdmin,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                token: contextAdmin(ctx),
            },
        }))
    )
);

app.use(
    mount(
        '/graphql',
        graphqlHTTP(async(ctx) => ({
            schema: schemaWeb,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                token: contextShop(ctx),
            },
        }))
    )
);

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`server running port ${port}`);
});