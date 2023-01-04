const mongoose = require('mongoose');
const logger = require('../utils/logger')

const { mongoConfig } = require('../config/config');
const { SessionModel } = require('../model/sessionModel');
const { crearHash } = require('../utils/cryptPass');

mongoose.connect(mongoConfig.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) logger.error(err)
});

class ContenedorSesiones {

    async findUser(user) {
        try {

            const userMongo = await SessionModel.findOne({ email: user });
            return userMongo;
        } catch (err) {
            logger.error(err)
        }
    }

    async createUser(user) {
        try {
            const userfind = await SessionModel.findOne({ email: user.email });
            if (userfind) {
                logger.error(`El Usuario ${user.email} ya existe`)
                return { err: "El usuario ya existe" }
            } else {
                user.password = crearHash(user.password);
                const newUser = new SessionModel(user);
                await newUser.save();
                return newUser;
            }
        } catch (err) {
            logger.error(err)
        }
    }
}

module.exports = ContenedorSesiones;

