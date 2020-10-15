const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const { config } = require('../config/key');
const { UserById } = require('../models/user');

const opts = {};

opts.secretOrKey = config.admin();

passport.use(
    new JwtStrategy(opts, async(jwt_payload, done) => {
        const user = await getByIdUser();
    })
);