const express = require('express')
const zod = require("zod")
const jwt = require(jsonwebtoken)
const router = express.Router()
const { User } = require('../db')
const JWT_SECRET = require("../config")
const authMiddleware = require("../middleware")

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post('/signup', async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({ message: "Email already taken / Incorrect inputs" })
    }

    const existingUser = User.findOne({ username: req.body.username, password: req.body.password })
    if (existingUser._id) {
        return res.status(411).json({ message: "Email already taken / Incorrect inputs" })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    const userId = user._id
    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json(200).json({
        message: "User created successfully",
        token
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signin', async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: 'Error while logging in'
        })
    }
    const user = await User.findOne({ username: req.body.username, password: req.body.password })
    if (user) {
        const userId = user._id
        const token = jwt.sign({ userId }, JWT_SECRET)
        res.status(200).json({
            token
        })
    } else {
        res.status(411).json({
            message: 'Error while logging in'
        })
    }
})

const updateuserBody = zod.object({
    password: zod.string().min(6).optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put('/', authMiddleware, (req, res) => {
    const { success, error } = updateuserBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: error
        })
    }
    User.updateOne({ _id: req.userId }, {
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
        .then(() => {
            res.status(200).json({
                message: 'User info updated successfully'
            })
        })
        .catch(() => {
            res.status(411).json({
                message: ' Error while updating information'
            })
        })
})

router.get('/bulk/filter', authMiddleware, async (req, res) => {
    const filterParam = req.query.filter || ''

    const users = await User.find({
        $or: [
            {
                firstName: {
                    "$regex": filterParam
                }
            },
            {
                lastName: {
                    "$regex": filterParam
                }
            }
        ]
    })

    res.status(200).json({
        user: users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router