const { faker } = require('@faker-js/faker');
const logger = require('../utils/logger')

class ContenedorProductos {

    
    async getRandom() {
        try {
            const productos = []

            for (let i = 0; i < 5; i++) {
                productos.push({
                    Titulo: faker.commerce.productName(),
                    Precio: faker.commerce.price(),
                    url: faker.image.sports(200, 200, true)
                })
            }

            return productos
        } catch (error) {
            logger.error(err)
        }
    }
}

module.exports = ContenedorProductos;