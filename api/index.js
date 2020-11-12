const Koa_router = require("koa-router");
const fs = require("fs");
const fastcsv = require("fast-csv");
const csvWriter = require("csv-write-stream");

const { readData } = require("../utils/sheets");
const {
  createCollection,
  getAllCollection,
  getAllCollectionStream,
} = require("../models/collection");
const { MyFileStreaming } = require("../utils/dowload");
const { Stream } = require("stream");

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
  for (const item of data) {
    await createCollection(item[2], item[3], item[1], item[4], item[0]);
  }
});

const ws = fs.createWriteStream("data/data.csv");

router.post("/export", async (ctx) => {
  const data = await getAllCollection();

  fastcsv
    .write(data, { headers: true })
    .on("finish", function() {
      console.log("Write to data.csv successfully!");
    })
    .pipe(ws);

  ctx.body = {
    result: "Write to data.csv successfully!",
  };
});

router.get("/dowload/:file", async (ctx) => {
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

router.get("/export/stream", async (ctx) => {
  const data = await getAllCollectionStream();
  const writer = csvWriter({
    collection_id: "collection_id",
    product: "product",
    title: "title",
    link: "link",
    published_at: "published_at",
  });
  for await (let item of data) {
    writer.write({
      collection_id: item.collection_id,
      product: item.product,
      title: item.title,
      link: item.link,
      published_at: item.published_at,
    });
  }
  ctx.disableBodyParser = true;
  ctx.set("Content-disposition", `attachment; filename=faqs.csv`);
  ctx.body = writer;
  ctx.status = 200;
  writer.end();
});

module.exports = router;
