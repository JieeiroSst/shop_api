const db = require("../db/knex");

const nameTable = "collections";

const getAllCollection = async () => {
  return await db(nameTable);
};

const getByIdCollection = async (collection_id) => {
  const condition = {
    collection_id,
  };
  return await db(nameTable).where(condition);
};

const createCollection = async (
  collection_id,
  title,
  product,
  link,
  published_at
) => {
  const entity = {
    collection_id,
    title,
    product,
    link,
    published_at,
  };
  return await db(nameTable)
    .insert(entity)
    .returning("*");
};

const updateCollection = async (collection_id, title, product, link) => {
  const condition = {
    collection_id,
  };
  const entity = {
    title,
    product,
    link,
  };

  return await db(nameTable)
    .where(condition)
    .update(entity)
    .returning("*");
};

const removeByIdCollection = async (collection_id) => {
  const condition = {
    collection_id,
  };

  return await db(nameTable)
    .del()
    .where(condition)
    .returning("*");
};

module.exports = {
  getAllCollection,
  getByIdCollection,
  updateCollection,
  createCollection,
  removeByIdCollection,
};
