import express, { Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.route'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/users', UserRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my express.ts server app')
})

export default app
