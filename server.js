const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const session = require('koa-session');
const mount = require('koa-mount');
const graphqlHTTP = require('./graphql/graphql-middlewasre');

const { passport } = require('./base');
const { schema } = require('./graphql');

const api = require('./api');

const app = new koa();

app
    .use(session({ signed: false }, app))
    .use(json())
    .use(bodyParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(async(ctx, next) => {
    await new Promise((resolve) => {
        passport.authenticate('jwt', async(err, user) => {
            resolve(user);
            ctx.state.user = user;
            let res = { ok: true, mesage: 'Authencation success' };
            if (!user) res = { ok: false, message: 'authencation failed' };
            ctx.body = res;
        })(ctx);
    });
    await next();
});

app.use(api.routes());

app.use(
    mount(
        '/graphql',
        graphqlHTTP(async(ctx, next) => ({
            schema,
            formatError: (err) => ({
                message: err.message,
            }),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            graphiql: true,
        }))
    )
);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`server running port ${port}`);
});