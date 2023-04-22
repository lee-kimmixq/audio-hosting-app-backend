import express from 'express'
import cors from 'cors'
import './config'

const { FRONTEND_URL } = process.env

const app = express()

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
)

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/test', (_, res) => {
  res.send('TEST works')
})

const PORT = process.env.PORT || 3000
app.listen(PORT)
