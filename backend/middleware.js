import jwt from 'jsonwebtoken'
import JWT_SECRET from './config.js'
const { verify } = jwt

const authMiddleware = (req, res, next) => {
    const authheader = req.headers.authorization
    if (!authheader || !authheader.startsWith('Bearer')) {
        res.status(403).json({})
    }
    const token = authheader.split(' ')[1]
    try {
        const decodedtoken = verify(token, JWT_SECRET)
        if (decodedtoken) {
            req.userId = decodedtoken.userId
            next()
        }
    } catch (err) {
        res.status(403).json({})
    }
}

export default authMiddleware