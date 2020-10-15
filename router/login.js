const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const Koa_router = require('koa-router');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { config } = require('../config/key');
const { UserById, userAll, userByName } = require('../models/user');

const router = new Koa_router();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('jwt'),
    secretOrKey: config.admin(),
    algorithms: ['RS256'],
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const user = await UserById(id);
    try {
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error, false);
    }
});

passport.use(
    new JwtStrategy(opts, async(jwt_payload, done) => {
        const user = await getByIdUser(jwt_payload.id);
        try {
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

passport.use(
    new LocalStrategy(async(username, password, done) => {
        const [user] = await userByName(username);
        try {
            const isValid = bcrypt.compare(password, user.password);
            if (isValid) {
                done(null, isValid);
            } else {
                done(fasle, null);
            }
        } catch (error) {
            done(error);
        }
    })
);

const cookieExtractor = (ctx) => {
    const token = null;
    if (ctx && ctx.cookies) {
        token = ctx.cookies['jwt'];
    }
    return token;
};

router.get(
    '/users',
    passport.authenticate('jwt', { session: false }),
    async(ctx) => {
        const users = await userAll();
    }
);

router.post('/login', async(ctx, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
    });
});

module.exports = router;