const Koa_router = require("koa-router");
const { google } = require("googleapis");
const { readData } = require("../utils/sheets");
const { createCollection } = require("../models/collection");

const router = new Koa_router();

const copes = ["https://www.googleapis.com/auth/spreadsheets"];
const sheets = google.sheets("v4");

router.get("/test", (ctx) => {
  ctx.body = {
    status: 201,
    message: "hello world",
  };
});

router.get("/read", async (ctx) => {
  const parameters = "Filtered Products!A2:E2009";
  const data = await readData(parameters);
  ctx.body = {
    data,
  };
});

router.post("/write", async (ctx) => {
  const parameters = "Filtered Products!A2:E2009";
  const data = await readData(parameters);
  const array = data.map((item) => {
    return {
      published_at: item[0],
      product: item[1],
      collection_id: item[2],
      title: item[3],
      link: item[4],
    };
  });

  for (let item of array) {
    const value = await createCollection(
      item.collection_id,
      item.title,
      item.product,
      item.link,
      item.published_at
    );
    ctx.body = {
      value,
    };
  }
});

module.exports = router;
