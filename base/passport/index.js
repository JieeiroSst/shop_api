const passport = require('koa-passport');
const LocalStrategy = require('./local');
const JwtStrategy = require('./jwt');

const { UserById } = require('../../models/user');

passport.use(LocalStrategy);
passport.use(JwtStrategy);

passport.deserializeUser(async(id, done) => {
    const [user] = await UserById(id);
    done(null, user);
});

passport.serializeUser((user, done) => {
    done(null, user.id);
});

module.exports = { passport };