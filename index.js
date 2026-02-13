// JavaScript source code
import 'dotenv/config'
import express from 'express'
import path from 'path'
const app = express()
import cors  from 'cors'
app.use(cors())
app.use(express.json())
import { envRouter } from './envelopeRoutes.js'
import { transactionRouter } from './transactionRoutes.js'

const PORT = process.env.PORT || 5432


app.use(express.static(path.join(__dirname, 'public')))
app.use('/personalBudget/envelopes', envRouter)
app.use('/personalBudget/transactions', transactionRouter)

app.use((err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({ message: `Error ${status} : ${err.message}` })
})
app.listen(PORT,'0.0.0.0', () => console.log(`Server listening on port ${PORT}`))