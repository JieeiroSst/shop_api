const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const session = require('koa-session');

const { passport } = require('./base');
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
        passport.authenticate('jwt', (err, user) => {
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

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`server running port ${port}`);
});