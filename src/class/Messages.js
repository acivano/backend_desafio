const mongoose = require('mongoose');
const { mongoConfig } = require('../config/config');
const { ChatModel } = require('../model/msgModel');
const logger = require('../utils/logger')

const normalizeMsgs = require('../utils/normalizr');

mongoose.connect(mongoConfig.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) logger.error(err);
});


class ContenedorMensajes {

    async save(msj) {
        try {
            const newMsg = new ChatModel(msj);
            await newMsg.save();

            return { Exito: "El mensaje se guardó correctamente" };
        } catch (err) {
            logger.error(err)
        }
    }

    async getAll() {
        try {
            const mensajes = await ChatModel.find({},{_id:0});

            return normalizeMsgs(mensajes);
        } catch (error) {
            logger.error(error)
        }
    }
}

module.exports = ContenedorMensajes;