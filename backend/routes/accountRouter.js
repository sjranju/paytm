import { Router } from 'express'
import db from '../db.js'
const router = Router()
import { object, string, number } from 'zod'
import { default as mongoose } from 'mongoose'
import authMiddleware from '../middleware.js'
const { Account } = db

router.get('/balance', authMiddleware, async (req, res) => {
    const userAccount = await Account.findOne({ userId: req.userId })
    res.status(200).json({
        balance: userAccount.balance
    })
})

const transferBody = object({
    to: string(),
    amount: number()
})

router.post('/transfer', authMiddleware, async (req, res) => {
    const reqBody = transferBody.safeParse(req.body)
    if (reqBody.success) {
        const { to, amount } = reqBody.data
        const session = await mongoose.startSession()

        try {
            session.startTransaction()
            const fromUser = await Account.findOne({ userId: req.userId }).session(session)
            if (!fromUser._id) {
                await session.abortTransaction()
                return res.status(400).json({
                    message: 'From account is invalid'
                })
            } else if (fromUser.balance < amount) {
                await session.abortTransaction()
                return res.status(400).json({
                    message: 'Insufficient balance'
                })
            }
            console.log('req.userId ', req.userId)

            const toUser = await Account.findOne({ userId: to }).session(session)
            if (!toUser._id) {
                await session.abortTransaction()
                res.status(400).json({
                    message: 'To account is invalid'
                })
            }
            const resp1 = await Account.updateOne({ userId: req.userId }, {
                $inc: {
                    balance: -amount
                }
            }).session(session)
            console.log(resp1)
            const resp = await Account.updateOne({ userId: to }, {
                $inc: {
                    balance: amount
                }
            }).session(session)
            console.log(resp)
            await session.commitTransaction()
            res.status(200).json({
                message: 'Transfer successful'
            })
        } catch (error) {
            await session.abortTransaction()
            res.status(402).json(error)
        }
    } else {
        return res.status(401).json(reqBody.error)
    }

})

export default router