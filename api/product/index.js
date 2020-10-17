const jwt = require('jsonwebtoken');

const { config } = require('../../config');
const { productAll } = require('../../models/product');

const products = async(ctx) => {
    let { authorization: token } = ctx.headers;
    token = token.replace('Bearer ', '');
    console.log(token);
    const check = jwt.verify(token, config.key());
    console.log(check);
    const data = await productAll();
    ctx.body = {
        data,
    };
};

module.exports = { products };