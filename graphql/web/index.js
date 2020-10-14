const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('../typeDeft');
const scalar = require('../scalar/isoDate');
let resolvers = require('./resolvers');
const { nodeInterface } = require('../../base/node');

resolvers = {...resolvers, ...scalar };

const schemaWeb = makeExecutableSchema({ typeDefs, resolvers });

module.exports = { schemaWeb };