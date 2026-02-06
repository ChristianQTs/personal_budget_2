import express from 'express'
import { getEnvNames, getAllEnvs, getSingleEnv, createEnv, transferBudget, withdrawFromEnv, deleteEnv } from './envelopeControllers.js'

const envRouter = express.Router()

envRouter.get('/names', getEnvNames)
envRouter.get('/', getAllEnvs)
envRouter.get('/:envName', getSingleEnv)
envRouter.post('/', createEnv)
envRouter.put('/:from/:to', transferBudget)
envRouter.put('/:envName/withdraw', withdrawFromEnv)
envRouter.delete('/:envName', deleteEnv)

export  {envRouter}