const { makeExecutableSchema } = require('graphql-tools');
const joinMonsterAdapt = require('join-monster-graphql-tools-adapter');
const { globalIdField } = require('graphql-relay');

const typeDefs = require('../typeDeft');
const scalar = require('../scalar/isoDate');
let resolvers = require('./resolvers');
const { nodeInterface } = require('../../base/node');
const node = require('./resolvers/node');

resolvers = {...resolvers, ...scalar };

const schemaAdmin = makeExecutableSchema({
    typeDefs,
    resolvers,
});

joinMonsterAdapt(schemaAdmin, {
    Query: {
        fields: {
            collections: {
                sqlTable: 'collections',
                sqlPaginate: true,
                orderBy: {
                    id: 'desc',
                },
            },

            products: {
                sqlTable: 'products',
                sqlPaginate: true,
                orderBy: {
                    id: 'desc',
                },
            },
        },
    },

    Mutation: {},

    Product: {
        name: 'Product',
        sqlTable: 'products',
        uniqueKey: 'id',
        sqlPaginate: true,
        interfaces: [nodeInterface],
        fields: {
            id: {
                ...globalIdField,
                sqlDeps: ['id'],
            },
            createdAt: {
                sqlColumn: 'created_at',
            },
            updatedAt: {
                sqlColumn: 'updated_at',
            },
            collections: {
                sqlTable: 'collections',
                sqlJoin: (productTable, collectionTable) =>
                    `${productTable}.collection_id=${collectionTable}.id`,
            },
            decription: {
                sqlTable: 'decription',
            },
            price: {
                sqlColumn: 'price',
            },
        },
    },

    Collection: {
        name: 'Collection',
        sqlTable: 'collections',
        uniqueKey: 'id',
        sqlPaginate: true,
        interfaces: [nodeInterface],
        fields: {
            id: {
                ...globalIdField,
                sqlDeps: ['id'],
            },

            createdAt: {
                sqlColumn: 'created_at',
            },

            updatedAt: {
                sqlColumn: 'updated_at',
            },

            products: {
                sqlTable: 'products',
                sqlJoin: (collectionTable, productTable) => {
                    return `${collectionTable}.id=${productTable}.collection_id`;
                },
            },
        },
    },

    Customer: {
        name: 'Customer',
        sqlTable: 'customers',
        uniqueKey: 'id',
        sqlPaginate: true,
        interfaces: [nodeInterface],
        fields: {
            createdAt: {
                sqlColumn: 'created_at',
            },

            updatedAt: {
                sqlColumn: 'updated_at',
            },
        },
    },

    User: {
        name: 'User',
        sqlTable: 'users',
        uniqueKey: 'id',
        sqlPaginate: true,
        interfaces: [nodeInterface],
        fields: {
            createdAt: {
                sqlColumn: 'created_at',
            },

            updatedAt: {
                sqlColumn: 'updated_at',
            },
        },
    },
});

module.exports = { schemaAdmin };