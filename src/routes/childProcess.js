const express = require('express');
const { Router } = express
const args = require('yargs/yargs')(process.argv.slice(2)).argv

const { fork } = require('child_process')

const routerChildProcess = Router()

routerChildProcess.get('/randoms', (req, res) => {
    const q = req.query.cant || 100000000
    const child = fork('./src/utils/numrandoms.js')

    child.send({ cantidad: q })

    child.on('message', (message) => {
        res.send({message, args})
    })
})

module.exports = routerChildProcess