import express from 'express'
import { getTransactions, deleteTransaction } from './transactionControllers.js'

const transactionRouter = express.Router()

transactionRouter.get('/:envName', getTransactions)
transactionRouter.delete('/:id/transactions', deleteTransaction)

export {transactionRouter }