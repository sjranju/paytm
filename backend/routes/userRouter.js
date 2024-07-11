import { Router } from 'express'
import { object, string } from "zod"
import jwt from 'jsonwebtoken'
const router = Router()
import db from '../db.js'
import JWT_SECRET from "../config.js"
import authMiddleware from "../middleware.js"
const { User, Account } = db
const { sign } = jwt

const signupBody = object({
    username: string().email(),
    password: string(),
    firstName: string(),
    lastName: string()
})

router.options('/me', (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Content-Type": "application/json",
        "Access-Control-Max-Age": 86400
    });
    return res.status(204).send();
})

router.get('/me', authMiddleware, async (req, res) => {
    const user = await User.findOne({ _id: req.userId })
    if (user) {
        return res.status(200).json({ username: user.username, firstName: user.firstName })
    } else {
        return res.status(401).json({
            'message': 'Invalid token'
        })
    }
})

router.options('/signup', (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Content-Type": "application/json",
        "Access-Control-Max-Age": 86400
    });
    return res.status(204).send();
})

router.post('/signup', async (req, res) => {
    try {
        const { success } = signupBody.safeParse(req.body)
        if (!success) {
            return res.status(411).json({ message: "Email already taken / Incorrect inputs" })
        }

        const existingUser = await User.findOne({ username: req.body.username, password: req.body.password })
        if (existingUser) {
            return res.status(411).json({ message: "Email already taken / Incorrect inputs" })
        }

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })

        const userId = user._id
        // Add random balance between 1 - 10000 for newly created user
        await Account.create({ userId, balance: 1 + Math.random() * 10000 })
        const token = sign({
            userId
        }, JWT_SECRET)

        return res.status(200).json({
            message: "User created successfully",
            token
        })
    } catch (error) {
        return res.status(400).json(error)
    }

})


const signinBody = object({
    username: string().email(),
    password: string()
})

router.options('/signin', (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Content-Type": "application/json",
        "Access-Control-Max-Age": 86400
    });
    return res.status(204).send();
})

router.post('/signin', async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: 'Error while logging in'
        })
    }
    const user = await User.findOne({ username: req.body.username, password: req.body.password })
    if (user) {
        const userId = user._id
        const token = sign({ userId }, JWT_SECRET)
        return res.status(200).json({
            token
        })
    } else {
        return res.status(411).json({
            message: 'Error while logging in'
        })
    }
})


const updateuserBody = object({
    password: string().min(6).optional(),
    firstName: string().optional(),
    lastName: string().optional()
})

router.options('/', (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT, OPTIONS",
        "Content-Type": "application/json",
        "Access-Control-Max-Age": 86400
    });
    return res.status(204).send();
})

router.put('/', authMiddleware, (req, res) => {
    const { success, error } = updateuserBody.safeParse(req.body)
    if (!success) {
        res.status(411).header({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Content-Type": "application/json",
            "Access-Control-Max-Age": 86400
        }).json({
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

router.options('/bulk', (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Content-Type": "application/json",
        "Access-Control-Max-Age": 86400
    });
    return res.status(204).send();
})

router.get('/bulk', authMiddleware, async (req, res) => {
    const filterParam = req.query.filter || ''
    const users = await User.find({
        $or: [
            {
                firstName: {
                    "$regex": filterParam,
                    "$options": "i"
                }
            },
            {
                lastName: {
                    "$regex": filterParam,
                    "$options": "i"
                }
            }
        ]
    })

    if (users) {
        res.status(200).json({
            user: users.map((user) => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
    }

})

export default router