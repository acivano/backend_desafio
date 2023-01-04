const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { validaPassword } = require('./cryptPass');

const ContenedorSesiones = require('../class/Sessions');
const logger = require('../utils/logger')
const manejadorSesiones = new ContenedorSesiones();


passport.use('login', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {

            const user = await manejadorSesiones.findUser(email);

            if (!user) return done(null, false)

            if (!validaPassword(user, password)) return done(null, false)

            return done(null, user)
        } catch (err) {
            logger.error(err)
            return done(err)
        }
    }
));

passport.use('singup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
},

    async (req, email, password, done) => {
        try {

            const user = await manejadorSesiones.createUser({ email, password });

            if (user.err) return done(null, false)
            return done(null, user)
        } catch (err) {
            logger.error(err)
            return done(err)
        }
    }
));

passport.serializeUser((email, done) => {
    done(null, email);
})
passport.deserializeUser((email, done) => {
    done(null, email);
})

module.exports = passport;