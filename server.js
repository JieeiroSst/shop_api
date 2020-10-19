const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const session = require('koa-session');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');

const passport = require('passport');

const passportAdmin = require('./base/admin');

const { contextAdmin } = require('./auth/admin');

// const passportWeb = require('./base/web');

const { schemaAdmin } = require('./graphql/admin');

const adminApi = require('./api/admin');

const app = new koa();

app
    .use(session({ signed: false }, app))
    .use(json())
    .use(bodyParser());

app
    .use(passportAdmin.initialize())
    .use(passportAdmin.session())
    .use(adminApi.routes());

//app.use(passportWeb.initialize()).use(passportWeb.session());

app.use(
    mount(
        '/graphql',
        graphqlHTTP(async(ctx) => ({
            schema: schemaAdmin,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                authorization: contextAdmin(ctx),
            },
        }))
    )
);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`server running port ${port}`);
});