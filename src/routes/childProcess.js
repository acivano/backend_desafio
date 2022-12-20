const express = require('express');
const { Router } = express
const { fork } = require('child_process')

const routerChildProcess = Router()

routerChildProcess.get('/randoms', (req, res) => {
    const q = req.query.cant || 100000000
    const child = fork('./src/utils/numrandoms.js')

    child.send({ cantidad: q })

    child.on('message', (message) => {
        res.send(message)
    })
})

module.exports = routerChildProcess