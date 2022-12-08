const mongoose = require('mongoose');

const { mongoConfig } = require('../config/config');
const { SessionModel } = require('../model/sessionModel');
const { crearHash } = require('../utils/cryptPass');

mongoose.connect(mongoConfig.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) console.log(err);
});

class ContenedorSesiones {

    async findUser(user) {
        try {
            console.log('find')
            console.log(user)
            const userMongo = await SessionModel.findOne({ email: user });
            return userMongo;
        } catch (err) {
            console.log(err)
        }
    }

    async createUser(user) {
        try {
            console.log(user)
            const userfind = await SessionModel.findOne({ email: user.email });
            console.log(userfind)
            if (userfind) {
                return { err: "El usuario ya existe" }
            } else {
                user.password = crearHash(user.password);
                const newUser = new SessionModel(user);
                await newUser.save();
                return newUser;
            }
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = ContenedorSesiones;

