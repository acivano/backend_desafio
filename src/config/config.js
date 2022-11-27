
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

require('dotenv').config()

const mongoConfig = {
    host: process.env.MONGO_URL,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
}

const sessionConfig = {

    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: advancedOptions
    }),

    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}

module.exports = { mongoConfig, sessionConfig };