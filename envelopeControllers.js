import { sequelize, Envelope, Transaction } from './db.js'





//get envelopes names only
export async function getEnvNames (req, res)  {
    const names = await Envelope.findAll({
        attributes: ['name']
    })
    res.json(names)
}

//get all envelopes
export async function getAllEnvs (req, res, next)  {
    const envelopes = await Envelope.findAll()
    if (!envelopes) {
        const err = new Error('No envelope found.')
        err.status = 404
        return next(err)
    }
    res.status(200).json(envelopes)
}

//get envelope by name
export async function getSingleEnv (req, res, next)  {
    res.status(200).json(req.envelope)
}
//create new envelope
export async function createEnv  (req, res, next)  {
    if (!req.body.name || !req.body.budget) {
        const err = new Error('Provide both the name and budget of the new envelope.')
        err.status = 400
        return next(err)
    }
    const newEnvelope = await Envelope.create({

        name: (req.body.name).toLowerCase(),
        budget: Number(req.body.budget),
        spent: 0

    })
    /* if (calculateTotalPlannedBudget() + newEnvelope.budget > totalBudget) {
         const err = new Error('Cannot add envelope, out of budget')
         err.status = 400
         return next(err)
     } else {
         envelopes.push(newEnvelope)
         
     } */
    res.status(201).json({ message: 'New envelope created.' })
}
//Transfer budget between two envelopes
export async function transferBudget (req, res, next)  {
    const fromEnv = await Envelope.findOne({ where: { name: req.params.from } })
    const toEnv = await Envelope.findOne({ where: { name: req.params.to } })
    if (!fromEnv || !toEnv) {
        const err = new Error('One of the envelopes does not exist')
        err.status = 404
        return next(err)
    }
    if (fromEnv.name == toEnv.name) {
        const err = new Error('Cannot transfer to the same envelope.')
        err.status = 400
        return next(err)
    }
    else {
        const amount = Number(req.body.amount)
        if (amount > fromEnv.budget) {
            const err = new Error(`Select an amount lower than ${fromEnv.budget}.`)
            err.status = 400
            return next(err)
        } else {
            fromEnv.budget -= amount
            toEnv.budget += amount
            await fromEnv.save({ fields: ['budget'] })
            await toEnv.save({ fields: ['budget'] })
            res.status(200).json({ message: `${amount} transferred from "${req.params.from}" to "${req.params.to}".` })
        }
    }
}

//withdraw from an envelope
export async function withdrawFromEnv (req, res, next)  {
    const amount = Number(req.body.amount)
    const recipient = req.body.recipient

    if (isNaN(amount)) {
        const err = new Error('Amount must be a number')
        err.status = 400
        return next(err)
    }
    if (amount > Number(req.envelope.balance)) {
        const err = new Error('Cannot withdraw, out of budget')
        err.status = 400
        return next(err)
    }
    req.envelope.spent += amount
    await req.envelope.save({ fields: ['spent'] })
    //save to transactions table:
    await Transaction.create({ envelope_name: req.envelope.name, amount, recipient, date: Date.now() })
    res.status(200).json({ message: `Envelope updated. ` })
}
//delete envelope
export async function deleteEnv (req, res, next)  {
    await req.envelope.destroy()
    res.status(204).json({ message: 'Envelope deleted successfully.' })

}