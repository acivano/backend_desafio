const express = require('express');
const { Router } = express

const args = require('yargs/yargs')(process.argv.slice(2)).argv
const numCPUs = require('os').cpus().length
const routerInfo = Router()

routerInfo.get('/info', (req, res) => {

    res.send({
        argumentos: args,
        nombre_plataforma: process.platform,
        version_node: process.version,
        memoria_uso: process.memoryUsage().rss,
        path_ejecucion: process.execPath,
        processId: process.pid,
        carpeta_proyecto: process.cwd(),
        num_procesadores_presentes: numCPUs
    })
})

module.exports = routerInfo