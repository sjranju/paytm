const express = require("express");
const cors = require('cors')
const rootRouter = require('./routes/index')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())
app.use('/api/v1', rootRouter)
console.log(`Application is running on port ${PORT}`)
app.listen(PORT)