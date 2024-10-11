import express from 'express'
import { fetchLatestData } from '../controllers/cryptoControllers.js'

const router = express.Router()

router.get("/stats", fetchLatestData)

export default router