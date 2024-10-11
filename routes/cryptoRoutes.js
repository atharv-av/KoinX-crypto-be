import express from 'express'
import { fetchLatestData, findDeviation } from '../controllers/cryptoControllers.js'

const router = express.Router()

router.get("/stats", fetchLatestData)
router.get("/deviation", findDeviation)

export default router