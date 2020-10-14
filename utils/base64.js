const btoa = require('btoa');
const atob = require('atob');

const encode = (params) => {
    return btoa(params);
};

const decode = (params) => {
    return atob(params);
};

module.exports = {
    encode,
    decode,
};