require('dotenv').config();

const { KEY_SECRET } = process.env;

const config = {
    key: () => {
        return KEY_SECRET;
    },
};

module.exports = { config };