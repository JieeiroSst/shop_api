const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const { config } = require('../../config');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.web(),
};

module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
    done(null, jwt_payload);
});