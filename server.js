import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.post('/encrypt', (req, res) => {
  const { message } = req.body
  const encrypted = `ENCRYPTED(${message})`
  res.json({ encrypted })
})

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`)
})
