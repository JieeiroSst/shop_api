const passport = require('koa-passport');
const LocalStrategy = require('./local');
const JwtStrategy = require('./jwt');

const { UserById } = require('../../models/user');

passport.use(LocalStrategy);
passport.use(JwtStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    console.log(id);
    const [user] = await UserById(id);
    done(null, user);
});

module.exports = passport;