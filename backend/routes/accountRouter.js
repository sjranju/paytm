const express = require('express')
const { Account, User } = require('../db')
const router = express.Router()
const zod = require('zod')
const { default: mongoose } = require('mongoose')
const authMiddleware = require('../middleware')

router.get('/balance', authMiddleware, async (req, res) => {
    const userAccount = await Account.findOne({ userId: req.userId })
    res.status(200).json({
        balance: userAccount.balance
    })
})

const transferBody = zod.object({
    to: zod.string(),
    amount: zod.number()
})

router.post('/transfer', authMiddleware, async (req, res) => {
    const reqBody = transferBody.safeParse(req.body)
    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        const fromUser = await Account.findOne({ userId: req.userId }).session(session)
        if (!fromUser._id) {
            await session.abortTransaction()
            res.status(400).json({
                message: 'From account is invalid'
            })
        } else if (fromUser.balance < req.body.amount) {
            await session.abortTransaction()
            res.status(400).json({
                message: 'Insufficient balance'
            })
        }

        const toUser = await Account.findOne({ userId: req.body.to }).session(session)
        if (!toUser._id) {
            await session.abortTransaction()
            res.status(400).json({
                message: 'To account is invalid'
            })
        }

        await Account.updateOne({ userId: req.userId }, {
            "$inc": {
                balance: -req.body.amount
            }
        }).session(session)
        await Account.updateOne({ userId: req.body.to }, {
            "$inc": {
                balance: req.body.amount
            }
        }).session(session)

        await session.commitTransaction()
        res.status(200).json({
            message: 'Transfer successful'
        })
    } catch (error) {
        await session.abortTransaction()
        res.status(400).json(error)
    }
})

module.exports = router