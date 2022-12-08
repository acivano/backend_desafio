const bCrypt = require('bcrypt')

function crearHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}
function validaPassword(user, password) {
    return bCrypt.compareSync(password, user.password)
}

module.exports = { crearHash, validaPassword }