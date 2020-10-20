const resolvers = {
    Query: {},
    Node: {
        __resolveType(node) {
            return node.__type__.name;
        },
    },
};

module.exports = { resolvers };