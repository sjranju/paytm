import { Router } from 'express'
import userRouter from './userRouter.js'
import accountRouter from './accountRouter.js'
import cors from 'cors';

const router = Router()

router.use(cors())
router.use('/user', userRouter)
router.use('/account', accountRouter)



export default router