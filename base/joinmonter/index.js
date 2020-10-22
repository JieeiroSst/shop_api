const { default: joinMonster } = require('join-monster');

const db = require('../../db/knex');

const option = { dialect: 'pg' };

const pagination = async(args, context, info) => {
    const data = await joinMonster(
        info,
        context,
        async(sql) => {
            return await db.raw(sql);
        },
        option
    );
    return data;
};

module.exports = { pagination };