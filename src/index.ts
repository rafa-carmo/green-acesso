import express from 'express'
import cors from 'cors'
const port = process.env.PORT || 4000

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('Hello World!')
})

app.listen(port, () => console.log(`✔ running on http://localhost:${port}`))
