const { productAll } = require('../../models/product');

const products = async(ctx, next) => {
    console.log(ctx.state);
    const data = await productAll();
    ctx.body = {
        data,
    };
};

module.exports = { products };