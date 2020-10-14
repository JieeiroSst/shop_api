const _ = require('lodash');

const modules = [
    require('./collection'),
    require('./node'),
    require('./product'),
];

const meregeAll = (item) => _.reduce(item, _.merge);

const resolvers = meregeAll(modules.map((item) => item.resolvers));

module.exports = {...resolvers };