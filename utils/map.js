const _ = require('lodash');

const mapIds = (ids, results) => {
    const m = _.keyBy(results, 'id');
    return ids.map((id) => {
        return m[id];
    });
};

// const mapIds = (ids, results) => {
//     return ids.map((id) =>
//         results.find(item => item.id == id)
//     );
// };

// const mapIdss = (ids, results) => {
//     let array = [];
//     for (let index of results) {
//         if (index)
//     }
//     // return ids.map((id) => {
//     //     console.log(id);
//     //     return id;
//     // });
// };

module.exports = { mapIds };