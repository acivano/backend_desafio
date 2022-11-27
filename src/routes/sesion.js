const express = require('express');
const { Router } = express

const routerSesions = Router()

routerSesions.get('/login', async (req, res) => {
    const name = req.query.nombre
    req.session.nameAccess = name

    res.redirect('/pages/products.html')
})


routerSesions.get('/logout', async (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

routerSesions.get('/get-name', async (req, res) => {

    res.send({ nameAccess: req.session.nameAccess })
})

module.exports = routerSesions