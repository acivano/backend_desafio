const permissionValidate = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).send({ status: 404, message: 'No estas autorizado' })
    }
}

module.exports = permissionValidate