const { result } = require('lodash');

const _ = require('lodash');

const mapIds = (ids, results) => {
    const m = _.keyBy(results, 'id');
    return ids.map((id) => m[id]);
};

module.exports = { mapIds };