const koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new koa();

app.use(bodyParser());


const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`server running port ${port}`);
});