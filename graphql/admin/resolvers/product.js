const { pagination } = require('../../../base/joinmonter');

const {
    createProduct,
    updateProduct,
    removeByIdProduct,
} = require('../../../models/product');

const resolvers = {
    Query: {
        products: async(parent, args, context, info) => {
            const data = await pagination(args, context, info);
            return data;
        },
    },
    Mutation: {
        createProduct: async(parent, args, context, info) => {
            const { name, decription, price, collectionID } = args;
            const data = await createProduct(name, decription, price, collectionID);
            return data;
        },
        updateProduct: async(parent, args, context, info) => {
            const { id, name, decription, price, collectionID } = args;
            const data = await updateProduct(
                id,
                name,
                decription,
                price,
                collectionID
            );
            return data;
        },
        deleteProduct: async(parent, args, context, info) => {
            const { id } = args;
            const data = await removeByIdProduct(id);
            return data;
        },
    },
};

module.exports = { resolvers };