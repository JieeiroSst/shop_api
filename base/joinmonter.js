const joinMonter = require('join-monster').default;
const { connectionFromArray } = require('graphql-relay');

const db = require('../db/knex');

const option = { dialect: 'pg' };

const pagination = async(args, context, resolverInfo) => {
    const data = await joinMonter(
        resolverInfo,
        context,
        async(sql) => {
            return await db.raw(sql);
        },
        option
    );

    return data;
};

module.exports = { pagination };