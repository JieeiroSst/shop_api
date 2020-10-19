const {
    productAll,
    productById,
    createProduct,
    updateProduct,
    removeProductById,
} = require('../../../models/product');

const products = async(ctx) => {
    const data = await productAll();
    ctx.body = {
        data,
    };
};

const product = async(ctx) => {
    const { id } = args;
    const data = await productById(id);
    ctx.body = {
        data,
    };
};

const newProduct = async(ctx) => {
    const { name, description, price, collection_id } = args;
    const data = await createProduct(name, description, price, collection_id);
    ctx.body = {
        data,
    };
};

module.exports = { products, product, newProduct };