const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../db/knex');

const { config } = require('../config/key');
const requireText = require('require-text');

const keyAdmin = config.admin();

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
console.log(ExtractJwt.fromAuthHeaderAsBearerToken());
opts.secretOrKey = keyAdmin;

passport.use(
    new JwtStrategy(opts, async(jwt_payload, done) => {
        try {
            const user = await db('users').where({ id: jwt_payload.sub });
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(err, false);
        }
    })
);

var cookieExtractorAdmin = (ctx) => {
    var token = null;
    if (ctx && ctx.cookies) {
        token = ctx.cookies.set('jwt-admin');
    }
    return token;
};

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await db('users').where({ id });
        done(null, user);
    } catch (error) {
        done(false, null);
    }
});