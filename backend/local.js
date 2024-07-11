import express, { json } from "express";
import cors from 'cors';
import rootRouter from './netlify/functions/routes/index.js';

const app = express()
const PORT = 3001

app.use(cors())
app.use(json())
app.use('/api/v1', rootRouter)
console.log(`Application is running on port ${PORT}`)
app.listen(PORT)