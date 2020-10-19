const { productAll } = require('../../models/product');

const products = async(ctx, next) => {
    const data = await productAll();
    ctx.body = {
        data,
    };
};

module.exports = { products };