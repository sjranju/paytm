import { Router } from 'express'
import userRouter from './userRouter.js'
import accountRouter from './accountRouter.js'

const router = Router()

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allows all domains
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.use('/user', userRouter)
router.use('/account', accountRouter)



export default router