const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const fs = require("fs");
const { google } = require("googleapis");
const request = require("request");

const api = require("./api");

const app = new koa();

app.use(bodyParser());

app.use(api.routes());

const port =  8080;
app.listen(port, () => {
  console.log(`server running port ${port}`);
});
