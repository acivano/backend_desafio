const express = require('express');
const { Router } = express

const ContenedorProductos = require('../class/Products')
const manejadorProductos = new ContenedorProductos()

const routerProductos = Router()

routerProductos.get('/', async (req, res) => {
    const productos = await manejadorProductos.getRandom()

    res.json(productos)
})

module.exports = routerProductos