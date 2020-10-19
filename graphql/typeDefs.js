const requireText = require('require-text');
const graphql = require('graphql');
const source = requireText('./schema.gql', require);
const schema = graphql.parse(source);

module.exports = schema;