const { nodeField } = require('../../../base/joinmonter');

const resolvers = {
    Query: {
        node: {
            nodeField,
        },
    },
    Node: {
        __resolveType(node) {
            return node.__type__.name;
        },
    },
};

module.exports = { resolvers };