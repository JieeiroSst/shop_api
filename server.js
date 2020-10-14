const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const KoaConvert = require('koa-convert');
const mount = require('koa-mount');
const KoaRouter = require('koa-router');
const graphqlHTTP = require('koa-graphql');

const { schemaAdmin } = require('./graphql/admin/index');
const { schemaWeb } = require('./graphql/web/index');

const { contextAdmin } = require('./auth/admin');
const { contextShop } = require('./auth/web');

const adminRouter = require('./api/admin');
const webRouter = require('./api/web');

const app = new koa();

app.use(bodyParser());

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

app.use(adminRouter.login.routes()).use(adminRouter.signup.routes());
app.use(webRouter.login.routes()).use(webRouter.signup.routes());

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