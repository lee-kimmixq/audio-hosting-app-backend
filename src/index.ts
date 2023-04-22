import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { FRONTEND_URL, PORT } from './config'
import { bindRoutes } from './routes'

const app = express()

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL!,
  })
)

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

app.get('/test', (_, res) => {
  res.send('TEST works')
})

bindRoutes(app)

app.listen(PORT)
