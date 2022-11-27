const authMiddleware = (req, res, next) => {
    if (req.session.nameAccess) {
        next()
    } else {
        res.json({ status: 404 })
    }
}

module.exports = authMiddleware