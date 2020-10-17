const jwt = require('jsonwebtoken');

const { productAll } = require('../../../models/product');

const products = async(ctx) => {
    let { authorization: token } = ctx.headers;
    token = token.replace('Bearer ', '');
    const data = await productAll();
    ctx.body = {
        data,
    };
};

module.exports = { products };