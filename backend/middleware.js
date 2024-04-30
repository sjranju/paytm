const jwt = require('jsonwebtoken')
const JWT_SECRET = require('./config')

const authMiddleware = (req, res, next) => {
    const authheader = req.headers.authorization
    if (!authheader || !authheader.startsWith('Bearer')) {
        res.status(403).json({})
    }
    const token = authheader.split(' ')[1]
    try {
        const decodedtoken = jwt.verify(token, JWT_SECRET)
        if (decodedtoken) {
            req.userId = decodedtoken.userId
            next()
        }
    } catch (err) {
        res.status(403).json({})
    }
}

module.exports = authMiddleware