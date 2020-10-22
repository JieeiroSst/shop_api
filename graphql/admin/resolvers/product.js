const { pagination } = require('../../../base/joinmonter');
const { createResolver } = require('../../resolver');
const {
    createProduct,
    updateProduct,
    removeProductById,
} = require('../../../models/product');

const role = 'ADMIN';

const resolvers = {
    Query: {
        products: createResolver(async(args, ctx, info) => {
            return await pagination(args, ctx, info);
        }, 'ADMIN'),
    },

    Mutation: {
        createProduct: createResolver(async(args, ctx, info) => {
            const { name, decription, price, collectionID } = args;
            const data = await createProduct(name, decription, price, collectionID);
            console.log(data);
            return data;
        }, 'ADMIN'),

        updateProduct: createResolver(async(args, ctx, info) => {
            const { id, name, decription, price, collectionID } = args;
            const data = await updateProduct(
                id,
                name,
                decription,
                price,
                collectionID
            );
            return data;
        }, 'ADMIN'),

        deleteProduct: createResolver(async(args, ctx, info) => {
            const { id } = args;
            const data = await removeProductById(id);
            return data;
        }, 'ADMIN'),
    },
};

module.exports = { resolvers };