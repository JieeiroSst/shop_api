require('dotenv').config();

const { KEY_SECRET_SHOP, KEY_SECRET_ADMIN } = process.env;

const config = {
    admin: () => {
        return KEY_SECRET_ADMIN;
    },
    web: () => {
        return KEY_SECRET_SHOP;
    },
};

module.exports = { config };