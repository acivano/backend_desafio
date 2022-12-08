const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { validaPassword } = require('./cryptPass');

 const ContenedorSesiones = require('../class/Sessions');

const manejadorSesiones = new ContenedorSesiones();

passport.use('login', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            console.log(email)
            console.log(password)
            const user = await manejadorSesiones.findUser(email);

            console.log(user)
            if (!user) return done(null, false)

            if (!validaPassword(user, password)) return done(null, false)

            return done(null, user)
        } catch (err) {
            console.log(err)
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
            console.log(email)
            console.log(password)
            const user = await manejadorSesiones.createUser({ email, password });
            console.log('pasa el await')
            console.log(user)
            if (user.err) return done(null, false)
            return done(null, user)
        } catch (err) {
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