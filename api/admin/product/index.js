const jwt = require('jsonwebtoken');

const { productAll } = require('../../../models/product');

const products = async(ctx) => {
    const data = await productAll();
    ctx.body = {
        data,
    };
};

module.exports = { products };