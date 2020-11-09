const Koa_router = require("koa-router");
const { google } = require("googleapis");
const fs = require("fs");
const nodeExel = require("excel-export");

const { readData } = require("../utils/sheets");
const { createCollection, getAllCollection } = require("../models/collection");

const router = new Koa_router();

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

router.post("/export", async (ctx) => {
  const confgruration = {};
  const data = await getAllCollection();
  confgruration.rows = data;
  confgruration.cols = [
    {
      caption: "collection_id",
      type: "Number",
      width: 20,
    },
    {
      caption: "title",
      type: "String",
      width: 20,
    },
    {
      caption: "product",
      type: "String",
      width: 20,
    },
    {
      caption: "link",
      type: "String",
      width: 20,
    },
    {
      caption: "published_at",
      type: "Date",
      width: 20,
    },
  ];

  const result = nodeExel.execute(confgruration);
  ctx.set("Content-Type", "application/vnd.openxmlformates");
  ctx.set("Content-Disposition", "attachment;filename=" + "file_name.xlsx");
});

module.exports = router;
