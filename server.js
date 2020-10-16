const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const session = require('koa-session');

const passportAdmin = require('./base/admin');
// const passportWeb = require('./base/web');

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

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`server running port ${port}`);
});