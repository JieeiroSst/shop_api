const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { getByIdUser } = require('../models/user');
const { getByIdCustomer } = require('../models/customer');
const { config } = require('./key');

const keyAdmin = config.admin();
const keyWeb = config.web();

const admin = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromHeader();
    opts.secretOrKey = keyAdmin;
    passport.use(
        new JwtStrategy(opts, async(jwt_payload, done) => {
            try {
                const user = await getByIdUser(jwt_payload.id);
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error, false);
            }
        })
    );
};

const web = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = keyWeb;
    passport.use(
        new JwtStrategy(opts, async(jwt_payload, done) => {
            try {
                const user = await getByIdCustomer(jwt_payload.id);
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error, false);
            }
        })
    );
};

module.exports = {
    admin,
    web,
};