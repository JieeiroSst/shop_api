const { productAll } = require('../../models/product');

const products = async(ctx, next) => {
    const data = await productAll();
    console.log(ctx.state);
    ctx.body = {
        data,
    };
};

module.exports = { products };