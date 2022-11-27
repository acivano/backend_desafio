const mongoose = require('mongoose');
const { mongoConfig } = require('../config/config');
const { ChatModel } = require('../model/msgModel');

const normalizeMsgs = require('../utils/normalizr');

mongoose.connect(mongoConfig.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) console.log(err);
});


class ContenedorMensajes {

    async save(msj) {
        try {
            const newMsg = new ChatModel(msj);
            await newMsg.save();

            return { Exito: "El mensaje se guardó correctamente" };
        } catch (err) {
            console.log(err)
        }
    }

    async getAll() {
        try {
            const mensajes = await ChatModel.find({},{_id:0});

            return normalizeMsgs(mensajes);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ContenedorMensajes;