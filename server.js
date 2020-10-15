const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');

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

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`server running port ${port}`);
});