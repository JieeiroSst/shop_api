const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const { config } = require('../config/key');

const keyWeb = config.web();

console.log(keyWeb);