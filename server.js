const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const session = require('koa-session');

const passport = require('./services');
const userApi = require('./api/user');

const app = new koa();
app.use(session({ signed: false }, app));
app.use(json());
app.use(bodyParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(userApi.routes());

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`server running port ${port}`);
});