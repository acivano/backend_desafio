const express = require('express');
const { Router } = express

const passport = require('passport');

const authorization = require('../middlewares/auth')

const routerSesions = Router()

routerSesions.get('/', authorization, async (req, res) => {
    req.session.nameAccess = req.user.email
    res.redirect('/pages/products.html')
})
routerSesions.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/pages/errorLogin.html',
    passReqToCallback: true
})
)
routerSesions.post('/register', passport.authenticate('singup', {
    successRedirect: '/',
    failureRedirect: '/pages/errorRegister.html',
    passReqToCallback: true
})
)
routerSesions.get('/logout', (req, res, next) => {

    req.logout(function (err) {

        if (err) return next(err);

        req.session.destroy()
        res.redirect("/");
    });
})

routerSesions.get('/get-name', async (req, res) => {

    res.send({ nameAccess: req.session.nameAccess })
})

module.exports = routerSesions