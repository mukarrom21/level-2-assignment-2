import express, { Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.route'

// Create an Express application instance
const app = express()

// Middleware setup: Parse incoming JSON requests and enable CORS
app.use(express.json())
app.use(cors())

// api routes
app.use('/api/users', UserRoutes)

// simple root route with welcome message
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my express.ts server app')
})

export default app
