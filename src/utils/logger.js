const winston = require('winston')
require('dotenv').config()

function buildProdLogger() {
    const prodLogger = winston.createLogger({
        transports: [
            new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
            new winston.transports.File({ filename: 'error.log', level: 'error' })
        ]
    })
    return prodLogger
}

function buildDevLogger() {
    const devLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: 'info' }),
    ]
    })
return devLogger
}

let logger = null
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
    logger = buildProdLogger()
} else {
    logger = buildDevLogger()
}

module.exports = logger