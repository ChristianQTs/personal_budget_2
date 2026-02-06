import express from 'express'
import {Envelope} from './db.js'
import { getEnvNames, getAllEnvs, getSingleEnv, createEnv, transferBudget, withdrawFromEnv, deleteEnv } from './envelopeControllers.js'

const envRouter = express.Router()

//check envelope exists by envelope name
envRouter.param('envName', async (req, res, next, envName) => {
    const envelope = await Envelope.findOne({ where: { name: envName.toLowerCase() } })
    if (!envelope) {
        const err = new Error('Envelope does not exist.')
        err.status = 404
        return next(err)
    } else {
        req.envelope = envelope
        next()
    }
})

envRouter.get('/names', getEnvNames)
envRouter.get('/', getAllEnvs)
envRouter.get('/:envName', getSingleEnv)
envRouter.post('/', createEnv)
envRouter.put('/:envName/withdraw', withdrawFromEnv)
envRouter.put('/:from/:to', transferBudget)
envRouter.delete('/:envName', deleteEnv)

export  {envRouter}