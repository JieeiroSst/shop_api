const Koa_router = require("koa-router");
const fs = require("fs");
const fastcsv = require("fast-csv");

const ws = fs.createWriteStream("data/data.csv");

const { readData } = require("../utils/sheets");
const { createCollection, getAllCollection } = require("../models/collection");

const router = new Koa_router();

router.get("/test", async (ctx) => {
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
  ctx.body = {
    status: 201,
    message: "hello world",
    result: array,
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

router.post("/export", async (ctx) => {
  const data = await getAllCollection();

  fastcsv
    .write(data, { headers: true })
    .on("finish", function() {
      console.log("Write to data.csv successfully!");
    })
    .pipe(ws);

  ctx.body = {
    result: "ok",
  };
});

router.post("/dowload/:file", async (ctx) => {
  const fileName = `data/${ctx.params.file}.csv`;
  try {
    if (fs.existsSync(fileName)) {
      ctx.body = fs.createReadStream(fileName);
      ctx.attachment(fileName);
    } else {
      ctx.throw(400, "Requested file not found on server");
    }
  } catch (error) {
    ctx.throw(500, error);
  }
});

module.exports = router;
