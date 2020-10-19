const passport = require('koa-passport');
const LocalStrategy = require('./local');
const JwtStrategy = require('./jwt');

const { customerById } = require('../../models/customer');

passport.use(LocalStrategy);
passport.use(JwtStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const [user] = await customerById(id);
    done(null, user);
});

module.exports = passport;