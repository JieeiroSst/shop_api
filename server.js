const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const passport = require('passport');
const session = require('koa-session');

const loginRouter = require('./router/login');

const app = new koa();

app.use(bodyParser());
app.use(session(app));
app.use(passport.initialize());
app.use(passport.session());

app.use(loginRouter.routes());

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`server running port ${port}`);
});