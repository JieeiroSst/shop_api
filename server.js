const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const session = require('koa-session');

const { passport } = require('./base');
const api = require('./api/login');
const adminApi = require('./api/admin');
const webApi = require('./api/web');

const app = new koa();

app
    .use(session({ signed: false }, app))
    .use(json())
    .use(bodyParser());

app.use(passport.initialize()).use(passport.session());

app.use(api.routes());
app.use(adminApi.routes());
app.use(webApi.routes());

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`server running port ${port}`);
});