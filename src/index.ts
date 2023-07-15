import express from 'express'
import cors from 'cors'
import { uploadRoutes } from './routes/upload'
import { bankSlipRoutes } from './routes/bankSlips'

const port = process.env.PORT || 4000

const app = express()
app.use(cors())
app.use(express.json())

app.use(uploadRoutes)
app.use(bankSlipRoutes)

app.listen(port, () => console.log(`✔ running on http://localhost:${port}`))
