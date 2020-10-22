const _ = require('lodash');

const modules = [
    require('./product'),
    require('./node'),
    require('./collection'),
];

const meregeAll = (item) => _.reduce(item, _.merge);

const resolvers = meregeAll(modules.map((item) => item.resolvers));

module.exports = {...resolvers };