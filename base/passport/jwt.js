const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const { config } = require('../../config');

const option = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('acces_token'),
    ]),
    secretOrKey: config.key(),
};

module.exports = new JwtStrategy(option, (jwt_payload, done) => {
    if (!jwt_payload) {
        done(new Error('invalid authencation token'));
    } else {
        done(null, jwt_payload);
    }
});