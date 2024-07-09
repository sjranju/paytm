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

router.get('/me', authMiddleware, async (req, res) => {
    const user = await User.findOne({ _id: req.userId })
    if (user) {
        return res.status(200).header({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTION",
            "Content-Type": "application/json"
        }).json({ username: user.username, firstName: user.firstName })
    } else {
        return res.status(401).header({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTION",
            "Content-Type": "application/json"
        }).json({
            'message': 'Invalid token'
        })
    }
})

router.post('/signup', async (req, res) => {
    try {
        const { success } = signupBody.safeParse(req.body)
        if (!success) {
            return res.status(411).header({
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTION",
                "Content-Type": "application/json"
            }).json({ message: "Email already taken / Incorrect inputs" })
        }

        const existingUser = await User.findOne({ username: req.body.username, password: req.body.password })
        if (existingUser) {
            return res.status(411).header({
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTION",
                "Content-Type": "application/json"
            }).json({ message: "Email already taken / Incorrect inputs" })
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

        return res.status(200).header({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTION",
            "Content-Type": "application/json"
        }).json({
            message: "User created successfully",
            token
        })
    } catch (error) {
        return res.status(400).header({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTION",
            "Content-Type": "application/json"
        }).json(error)
    }

})

const signinBody = object({
    username: string().email(),
    password: string()
})

router.post('/signin', async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).header({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTION",
            "Content-Type": "application/json"
        }).json({
            message: 'Error while logging in'
        })
    }
    const user = await User.findOne({ username: req.body.username, password: req.body.password })
    if (user) {
        const userId = user._id
        const token = sign({ userId }, JWT_SECRET)
        return res.status(200).header({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTION",
            "Content-Type": "application/json"
        }).json({
            token
        })
    } else {
        return res.status(411).header({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTION",
            "Content-Type": "application/json"
        }).json({
            message: 'Error while logging in'
        })
    }
})

const updateuserBody = object({
    password: string().min(6).optional(),
    firstName: string().optional(),
    lastName: string().optional()
})

router.put('/', authMiddleware, (req, res) => {
    const { success, error } = updateuserBody.safeParse(req.body)
    if (!success) {
        res.status(411).header({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTION",
            "Content-Type": "application/json"
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
            res.status(200).header({
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTION",
                "Content-Type": "application/json"
            }).json({
                message: 'User info updated successfully'
            })
        })
        .catch(() => {
            res.status(411).header({
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTION",
                "Content-Type": "application/json"
            }).json({
                message: ' Error while updating information'
            })
        })
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
        res.status(200).header({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTION",
            "Content-Type": "application/json"
        }).json({
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