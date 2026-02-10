import { sequelize, Transaction, Envelope } from './db.js'


//get transactions by envelope name

export async function getTransactions(req, res, next) {
    const transactions = await Transaction.findAll({ where: { envelope_name: req.params.envName } })
    if (transactions.length == 0) {
        const err = new Error(`No transaction found for the envelope ${req.params.envName}.`)
        err.status = 400
        return next(err)
    }

    res.status(200).json(transactions)
}

//delete transaction

export async function deleteTransaction(req, res, next) {
    const transactionFound = await Transaction.findOne({ where: { id: req.params.id } })

    if (!transactionFound) {
        const err = new Error('Transaction not found')
        return next(err)
    }

    const transactionEnvelope = await Envelope.findOne({ where: { name: transactionFound.envelope_name } })
    transactionEnvelope.spent -= transactionFound.amount
    await transactionEnvelope.save()

    await transactionFound.destroy()

    res.status(204).send()
}