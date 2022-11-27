const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

    author: {
        email: { type: String, required: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        edad: { type: Number, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true }
    },
    text: { type: String, required: true }
});

const ChatModel = mongoose.model("chat", Schema);

module.exports = { ChatModel };