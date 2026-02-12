// JavaScript source code
import 'dotenv/config'
import express from 'express'
const app = express()
import cors  from 'cors'
app.use(cors())
app.use(express.json())
import { envRouter } from './envelopeRoutes.js'
import { transactionRouter } from './transactionRoutes.js'

const PORT = process.env.PORT || 5432



app.use('/personalBudget', envRouter)
app.use('/personalBudget', transactionRouter)

app.use((err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({ message: `Error ${status} : ${err.message}` })
})
console.log(process.env.DATABASE_URL)
app.listen(PORT,'0.0.0.0', () => console.log(`Server listening and ready.`))